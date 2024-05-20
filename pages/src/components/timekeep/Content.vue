<script setup>
import TableModel from '/src/model/TableModel.js';
import TableItemModel from '/src/model/TableItemModel.js';
import TimerModel from '/src/model/TimerModel.js';
import { ref, onMounted } from 'vue';
import { api_url, getCookie } from '/src/common.js';

const table = ref(new TableModel());
const timer = ref(new TimerModel());
let paused = true;
const spentT = ref('');
const stT = ref('');
const endT = ref('');
let end = true;
let dataReady = false;

function getTimeString(time) {
  return `${time.hours}:${time.minutes}:${time.seconds}`;
}

setInterval(() => {
  if(!paused) {
    spentT.value = getTimeString(timer.value.getSpentTime());
    stT.value = getTimeString(timer.value.getTimerStart());
    endT.value = getTimeString(timer.value.getTimer());
  }
}, 1000);



function handleStart() {
  timer.value.resetTimer();
  end = false;
  dataReady = false;
  paused = false;
  timer.value.startTimer(new Date());
}

function handleStop() {
  if(end) {
      return;
  }
  timer.value.stopTimer();
  end = true;
  dataReady = true;
}

function handlePause() {
    if(end) {
        return;
    }
    paused = !paused;
    if(paused) {
        timer.value.stopTimer();
    }
    else {
        timer.value.startTimer(new Date());
    }
}

function handleSave() {
    if(!end) {
        timer.value.stopTimer();
        end = true;
        dataReady = true;
    }
    if(dataReady) {
        if(document.getElementById("labelTimer").value === "") {
            alert("Please enter a label for the timer");
            return;
        }
        saveData();
    }
}

function saveData() {
    const label = document.getElementById("labelTimer").value;
    const stTime = timer.value.getTimerStart();
    const endTime = timer.value.getTimer();
    const spentTime = timer.value.getSpentTime();
    table.value.addItem(label, stT, endT, spentT);
    let spent = timer.value.getSpentTime();
    fetch(api_url + "/update-spent-time",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_hash: getCookie("user_hash"),
            spent_time: `${spent.hours}:${spent.minutes}:${spent.seconds}`,
        }),
    }).then((response) => response.json())
    .then((data) => alert(data.message));
    dataReady = false;
}

function handleClear() {
    table.value.setItems("[]");
    window.location.reload();
}
</script>

<template>
<div class="row">
  <div class="col-7 offset-2">
    <h1 class="text-center mb-4">Timekeep</h1>
  </div>
</div>
<div class="row">
  <div class="col-md-7 offset-md-2">
    <div class="row box-3">
      <div class="col">
        <div class="row mt-2">
          <div class="col">
            <h3>Start</h3>
          </div>
        </div>
        <div class="countdown display-6 text-size-1" id="countdown">
          <div id="timer1">
            <span>{{ stT }}</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row mt-2">
          <div class="col">
            <h3>End</h3>
          </div>
        </div>
        <div class="countdown display-6 text-size-1" id="countdown">
          <div id="timer2">
            <span>{{ endT }}</span>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row mt-2">
          <div class="col">
            <h3>Spent</h3>
          </div>
        </div>
        <div class="countdown display-6 text-size-1" id="countdown">
          <div id="timer3">
            <span>{{ spentT }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="form-floating mt-3">
        <input type="text" class="form-control min-vw-30 input-1" id="labelTimer" placeholder="label">
        <label for="floatingInput">Label</label>
    </div>
    <div class="btn-group w-100">
      <button id="startTimer" class="btn btn-1 mt-2" @click="handleStart">
        <i class="fa-solid fa-play"></i>
      </button>
      <button id="pauseTimer" class="btn btn-1 mt-2" @click="handlePause">
        <i class="fa-solid fa-pause"></i>
      </button>
      <button id="stopTimer" class="btn btn-1 mt-2" @click="handleStop">
        <i class="fa-solid fa-stop"></i>
      </button>
    </div>
    <div class="btn-group w-100">
      <button @click="handleSave" id="_saveData" class="btn btn-1 mt-2">Save</button>
      <button @click="handleClear" id="clearData" class="btn btn-1 mt-2">Clear</button>
    </div>
  </div>
</div>
<table class="table table-1 mt-5">
  <thead>
    <tr>
      <th class="col table-1">#</th>
      <th class="col">Label</th>
      <th class="col">Start time</th>
      <th class="col">End time</th>
      <th class="col">Spent time</th>
    </tr>
  </thead>
  <tbody id="_timerTable">
    <tr v-for="item in table.getItems()" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.label }}</td>
      <td>{{ item.stTime }}</td>
      <td>{{ item.endTime }}</td>
      <td>{{ item.spentTime }}</td>
    </tr>
  </tbody>
</table>
</template>

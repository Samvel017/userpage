let listArr = [];
let todoInput = document.querySelector('.todo-input');
let btnAdd = document.querySelector('.btnAdd');
let btnRemove = document.querySelector('.btnRemove');
let showList = document.querySelector('.list');
let pagList = document.querySelector('.pagination');
let listImp = document.querySelector('.list-important');
let listUnImp = document.querySelector('.list-unimportant');
let line = document.querySelector('.line');
let percentNum = document.querySelector('.percent-num');
let impArr = [];
let unimpArr = [];

btnRemove.addEventListener('click', () => {
  if (listArr.length >= 1) {
    listArr = [];
    impArr = [];
    unimpArr = [];
    listImportant();
    listUnImportant();
    paginationBtn(listArr);
    let blocks = showList.querySelectorAll('.list__item');
    blocks.forEach((e) => {
      e.remove();
    });
  }
});

todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode == '13') {
    btnAdd.click();
  }
});

btnAdd.addEventListener('click', () => {
  if (todoInput.value != '') {
    let object = {
      title: '',
      important: false,
    };

    object.title = todoInput.value;
    listArr.push(object);
    paginationBtn(listArr);
    smartList(object);
    smart(0);
    impArr = listArr.filter((elem) => elem.important == true);
    unimpArr = listArr.filter((elem) => elem.important == false);
    console.log(impArr);
    listImportant();
    listUnImportant();

    let btnPag = pagList.querySelectorAll('.pagination__btn');
    btnPag[0].classList.add('pagination__btn-active');
    btnPag.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        smart(i);
        addClass(elem, btnPag);
      });
    });
    todoInput.value = '';
  } else {
    alert('Input value is empty.');
  }
});

function paginationBtn(arr, size = 5) {
  let btn = '';

  for (let i = 0; i < arr.length / size; i++) {
    btn += `<button class='pagination__btn'>${i + 1}</button>`;
  }
  pagList.innerHTML = btn;
}

function smart(page, size = 5) {
  let arrayList = [];
  arrayList = listArr.slice().splice(page * size, size);
  showList.innerHTML = '';
  for (let i = 0; i < arrayList.length; i++) {
    smartList(arrayList[i]);
  }
}

function smartList(obj) {
  let block = document.createElement('div');
  block.classList.add('list__item');
  if (obj.important == true) {
    block.classList.add('important');
  }
  block.innerHTML = `
        <div class='list__title'>
          <span>${obj.title}</span>
        </div>
        <div class='list__btn'>
          <button class="btn itemRemove"><i class="fas fa-times"></i></button>
          <button class="btn impBtn"><i class="fas fa-star"></i></button>
        </div>`;
  showList.append(block);
  let impBtn = block.querySelector('.impBtn');
  let itemRemove = block.querySelector('.itemRemove');

  impBtn.addEventListener('click', () => {
    if (obj.important == false) {
      obj.important = true;
      block.classList.add('important');
      impArr = listArr.filter((elem) => elem.important == true);
      unimpArr = listArr.filter((elem) => elem.important == false);

      listImportant();
      listUnImportant();

      console.log(impArr);
    } else {
      obj.important = false;
      block.classList.remove('important');
      impArr = listArr.filter((elem) => elem.important == true);
      unimpArr = listArr.filter((elem) => elem.important == false);
      listImportant();
      listUnImportant();
      console.log(impArr);
    }
  });

  itemRemove.addEventListener('click', () => {
    block.remove();
    let index = listArr.indexOf(obj);
    if (index != '-1') {
      listArr.splice(index, 1);
    }
    let btnCount = pagList.querySelectorAll('.pagination__btn');
    let pagin = document.querySelector('.pagination');
    let num = Math.ceil(listArr.length / 5);
    console.log(num);
    console.log(btnCount);
    if (num != btnCount.length) {
      pagin.lastElementChild.remove();
      smart(0);
    }
    impArr = listArr.filter((elem) => elem.important == true);
    unimpArr = listArr.filter((elem) => elem.important == false);
    listImportant();
    listUnImportant();
    console.log(impArr);
  });
}

function addClass(btnElem, prevBtn) {
  prevBtn.forEach((elem) => elem.classList.remove('pagination__btn-active'));
  btnElem.classList.add('pagination__btn-active');
}

// -------------- TAB-MENU -----------------

let btnTabs = document.querySelectorAll('.todo-tab');
let page = document.querySelectorAll('.page');
for (let i = 0; i < btnTabs.length; i++) {
  btnTabs[i].addEventListener('click', () => {
    let tabId = btnTabs[i].getAttribute('data-tab');
    let block = document.querySelector(tabId);
    for (let j = 0; j < btnTabs.length; j++) {
      btnTabs[j].classList.remove('active-btn');
    }
    for (let k = 0; k < page.length; k++) {
      page[k].classList.remove('active-tab');
    }
    btnTabs[i].classList.add('active-btn');
    block.classList.add('active-tab');
  });
}

// -----------------------------------------

function listImportant() {
  listImp.innerHTML = '';
  for (let i = 0; i < impArr.length; i++) {
    let impBlock = document.createElement('div');
    impBlock.classList.add('impBlock');
    impBlock.innerHTML = `
        <span>${impArr[i].title}</span>
      `;
    listImp.append(impBlock);
  }
  if (listArr != '') {
    let percent = Math.round((impArr.length / listArr.length) * 100);
    console.log(percent);
    percentNum.innerHTML = `${percent}%`;
    line.style.width = percent + '%';
    if (percent <= 33) {
      line.style.backgroundColor = `rgb(17, 201, 57)`;
      percentNum.style.color = `rgb(17, 201, 57)`;
    } else if (percent > 33 && percent <= 65) {
      line.style.backgroundColor = `yellow`;
      percentNum.style.color = `yellow`;
    } else if (percent > 65 && percent < 80) {
      line.style.backgroundColor = `orange`;
      percentNum.style.color = `orange`;
    } else if (percent >= 80) {
      line.style.backgroundColor = `crimson`;
      percentNum.style.color = `crimson`;
    }
  } else {
    let percent = 0;
    percentNum.innerHTML = `${percent}%`;
    line.style.width = percent + '%';
  }
}
function listUnImportant() {
  listUnImp.innerHTML = '';
  for (let i = 0; i < unimpArr.length; i++) {
    let unImpBlock = document.createElement('div');
    unImpBlock.classList.add('unImpBlock');
    unImpBlock.innerHTML = `
        <span>${unimpArr[i].title}</span>
      `;
    listUnImp.append(unImpBlock);
  }
  if (listArr != '') {
    let percent = Math.round((impArr.length / listArr.length) * 100);
    console.log(percent);
    percentNum.innerHTML = `${percent}%`;
    line.style.width = percent + '%';
    if (percent <= 33) {
      line.style.backgroundColor = `rgb(17, 201, 57)`;
      percentNum.style.color = `rgb(17, 201, 57)`;
    } else if (percent > 33 && percent <= 65) {
      line.style.backgroundColor = `yellow`;
      percentNum.style.color = `yellow`;
    } else if (percent > 65 && percent < 80) {
      line.style.backgroundColor = `orange`;
      percentNum.style.color = `orange`;
    } else if (percent >= 80) {
      line.style.backgroundColor = `crimson`;
      percentNum.style.color = `crimson`;
    }
  } else {
    let percent = 0;
    percentNum.innerHTML = `${percent}%`;
    line.style.width = percent + '%';
  }
}

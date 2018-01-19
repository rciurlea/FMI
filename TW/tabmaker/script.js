window.onload = () => {
  document.addEventListener("mouseover", e => {
    if (e.target.classList.contains("tab")) {
      let tabs = document.getElementsByClassName('tab');
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i] !== e.target)
          tabs[i].classList.remove('tab-hovering');
        else
          tabs[i].classList.add('tab-hovering');
      }
    } else {
      let tabs = document.getElementsByClassName('tab');
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('tab-hovering');
      }
    }
  });

  document.addEventListener("click", e => {
    if (e.target.classList.contains("tab")) {
      let tabs = document.getElementsByClassName('tab');
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i] !== e.target)
          tabs[i].classList.remove('tab-selected');
        else
          tabs[i].classList.add('tab-selected');
      }
    }
  });
};

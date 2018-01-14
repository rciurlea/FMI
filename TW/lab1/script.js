(() => {
  const init = () => {
    const logo = document.getElementById('logo');
    logo.onclick = () => {
      logo.src = 'https://thetwistedpathgroup.files.wordpress.com/2015/04/mpg2.jpg';
    };

    const profile = document.getElementById('profile');
    const newPic = document.createElement('img');
    newPic.src = 'https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg';
    newPic.width = '100';
    newPic.style.border = '12px inset darkorange';
    newPic.onclick = (e) => {
      e.target.style.border = '50px inset darkorange';
    };
    // let i = 1;
    // setInterval(() => {
    //   newPic.width = 100 + 1 * Math.exp(i);
    //   console.log(newPic.width);
    //   i++;
    // }, 20);
    profile.appendChild(newPic);

    const h2s = document.getElementsByTagName('h2');
    for (let i = 0; i < h2s.length; i++) {
      const item = h2s.item(i);
      item.style.color = 'red';
      item.style['font-size'] = (6 * Math.PI + Math.exp(i)) + 'px';
    }
  };

  function printMaxInt() {
    let i = 0;
    while (i !== i + 1) {
      i *= 10000;
    }
    console.log(i);
  }

  window.onload = () => {
    init();
    //printMaxInt();
  };
})();

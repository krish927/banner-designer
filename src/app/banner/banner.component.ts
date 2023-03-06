import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
@Input() image;
@Input() logo;
@Input() title;
banner:any;
editMoreBtn: boolean = false;
@ViewChild('elem') elem:ElementRef;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.image);
    // console.log(this.logo);
    // console.log(this.title);
    setTimeout(() => {
      this.capturar()
    }, 500);
  }


  // Function to create the snapshot of the banner in html tags (by Pankaj Phour) on March 06 2023
  capturar(){
    // Getting our banner parent element by it's id 
    var node = document.getElementById('capture');
    var options = {quality: 1};

    // converting the banner of html tags to image 
    domtoimage.toJpeg(node, options).then((dataUrl) => {
      console.log(dataUrl) //Image in base64 jpeg
      this.banner = dataUrl
    });
}

editMore(){
  window.location.reload();
}

ngAfterViewInit() {
  this.registerDragElement();
}

registerDragElement() {
  const elmnt = document.getElementById('mydiv');

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  const dragMouseDown = (e) => {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e) => {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  };

  const closeDragElement = () => {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  };

  if (document.getElementById(elmnt.id + 'header')) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }
}

allowDrop(ev): void {
  ev.preventDefault();
}

drag(ev): void {
  ev.dataTransfer.setData("text", ev.target.id);
}

drop(ev): void {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

}

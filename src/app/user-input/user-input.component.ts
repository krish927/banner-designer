import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {
@ViewChild('handleInput') handleInput:ElementRef;
backGround:any;
logo:any;
imageUpload:boolean = true;
logoUpload:boolean = false;
submitted:boolean = false;
form:FormGroup;
  constructor(private _fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.validation();
  }

  validation(){
    this.form = this._fb.group({
        title:['',Validators.required],
    })
  }

handleChange(e:any){
  console.log(e);
  const reader = new FileReader();
  reader.onload = (event:any)=>{
    console.log(event);
    this.backGround = event.target.result;
    this.imageUpload = false;
    this.logoUpload = true;
  }
  reader.readAsDataURL(e.target.files[0])
}

handleLogo(e:any){
  console.log(e);
  const reader = new FileReader();
  reader.onload = (event:any)=>{
    this.logo = event.target.result;
    this.logoUpload = false
  }
  reader.readAsDataURL(e.target.files[0])
  
}

submit(){
  console.log("Submitting...");
  console.log(this.backGround,this.logo,this.form.value);
  this.submitted = true;
}

}


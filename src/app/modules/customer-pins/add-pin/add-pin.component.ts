import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../../types/main-types';
import { MainService } from '../../../services/main.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.css'
})
export class AddPinComponent {
  fileType = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
  customerData: Customer[] = [];
  pinForm: FormGroup;
  isSubmitted : boolean = false;
  activeModal = inject(NgbActiveModal);
  uploader:FileUploader
  fileName:string = "Choose & Drag and drop file here"
  inProcess: boolean = false;

  constructor(private mainService: MainService){
    this.pinForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      collaboratory: new FormControl([], [Validators.required]),
      privacy: new FormControl('Private', [Validators.required])
    });
    this.customerData = this.mainService.getCustomers();
    this.uploader = new FileUploader({
      url: "",
      disableMultipart : false,
      autoUpload: false,
      allowedFileType: ['image']
    });
  }

  /**
  * Call when pin form is submitted
  * @return {void}
  */
  onSubmit(){
    this.isSubmitted = true;
    if(this.pinForm.valid){
      this.mainService.addPin(this.pinForm.value);
      this.activeModal.close();
    }
  }

  /**
  * Call when user close the modal
  * @return {void}
  */
  onClose(){
    this.activeModal.close();
  }

  /**
  * Call when user drag & drop the file
  * @return {void}
  */
  fileDrop(event){
    if(event && this.fileType.includes(event[0].type)){
      this.fileName = event[0].name;
      this.convertFileToBase64(event[0])
    }
  }

  /**
  * Call when user select file
  * @return {void}
  */
  fileSelect(event){
    let file = event.target.files[0];
    if(file && this.fileType.includes(file.type)){
      this.fileName = file.name;
      this.convertFileToBase64(file)
    }
  }

  /**Convert Image to base64 format
  * @return {void}
  */
  convertFileToBase64(file){
    this.inProcess = true;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.pinForm.get('image').setValue(reader.result);
       this.inProcess = false;
    };
  }
}


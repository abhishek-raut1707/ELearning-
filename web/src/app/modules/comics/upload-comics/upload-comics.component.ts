import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { Comics } from '../../../../models/comics';
import { Panel, ExpData } from '../../../../models/panel';
import { ExpressionData } from '../../../../models/expData';
// Service

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-comics.component.html',
  styleUrls: ['./upload-comics.component.scss']
})
export class UploadComicsComponent implements OnInit {

  masterPanelData = new Panel();
  masterComicsData = new Comics();
  htmlInputFromComic: FormGroup;
  htmlInputFromPanel: FormGroup;
  htmlInputFromExp: FormGroup;
  uploadedPanelsArr: any = [];
  currentImageValue: File;
  recIdArr: any = [];
  recId: any;
  image;
  expressionData: ExpressionData[] = [{expID: 'Put together', contextID:'put something together'}, {expID: 'build together', contextID:'build something together'}];
  showModal: boolean;
  constructor(
  private apiServ: ApiServiceService,
  private toastr: ToastrService,
  private fb: FormBuilder,
  private router: Router
  ) {
    this.createComicForm();
    this.createPanelForm();
    this.createExpForm();
  }
  ngOnInit() {
    this.showModal = true
   }

  createComicForm() {
    this.htmlInputFromComic = this.fb.group({
      title: ['', Validators],
      plan: ['', Validators],
    });
  } 


  createPanelForm() {
    this.htmlInputFromPanel = this.fb.group({
      serial_no: ['', Validators],
      alt: ['', Validators],
      title: ['', Validators],
      image_url: ['', Validators],
      description: ['', Validators]
    });
  }

  createExpForm() {
    this.htmlInputFromExp = this.fb.group({
      expstring:['', Validators],
      expID: '',
      contextID: ''
    })
  }

  handleFileUploadEvent(event: any) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      this.uploadedPanelsArr.push(image);
      this.toastr.success(' Successfully added ', image.name);
    }
  }



  checkEXPID(event: any) {
    const expString = this.htmlInputFromExp.value.expstring;
    this.apiServ.getExpID(expString)
    .subscribe(
      (data: any) => {
        this.expressionData.push(data);
      }
    )
  }


  currentImagePointer(value) {
    this.currentImageValue = value;
  }

  addpanelExpData(event: any) {
    const expData = new ExpData();
      expData.expstring = this.htmlInputFromExp.value.expstring,
      expData.ExpID = this.htmlInputFromExp.value.expID,
      expData.ContentID = this.htmlInputFromExp.value.contextID

      this.masterPanelData.exp_data.push(expData);
      this.submitPanelData();
  }


  addPanelMetadata(event: any) {
    
    this.masterPanelData.serial_no = this.htmlInputFromPanel.value.serial_no;
    this.masterPanelData.alt = this.htmlInputFromPanel.value.alt;
    this.masterPanelData.description = this.htmlInputFromPanel.value.description;
    this.masterPanelData.title = this.htmlInputFromPanel.value.title;
    this.masterPanelData.img_url = this.htmlInputFromPanel.value.img_url;



  }
   
  submitPanelData() {
    const file = this.currentImageValue;
    console.log('this.masterPanelData on panel submit all', this.masterPanelData);
    const formData = new FormData();
    formData.append('file', file, file.name);

    // this.apiServ.postUploadImage(formdata).subscribe(
    //   (data: any) => {
    //     if (data) {
    //       this.toastr.success(' The Panel is Uploaded with id : ' + data.id);
    //       this.recId = data;
    //       this.recIdArr.push(this.recId.id);
    //       console.log(this.recId.id);

    //     } else {
    //       this.toastr.error(' Error in uploading the Comic panel');
    //     }
    //   }
    // );
  }

  submitComic(event: any) {

  }
}
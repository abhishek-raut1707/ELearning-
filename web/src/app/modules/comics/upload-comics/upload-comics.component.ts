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
  url;
  expressionData: ExpressionData[] = [];
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
    this.showModal = true;
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
      expstring: ['', Validators],
      expID: '',
      contextID: ''
    });
  }

  handleFileUploadEvent(event: any) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      this.uploadedPanelsArr.push(image);
      this.toastr.success(' Successfully added ', image.name);
    }

      // const reader = new FileReader();

      // reader.onload = (event: ProgressEvent) => {
      //   this.url = (<FileReader>event.target).result;
      // };

      // reader.readAsDataURL(event.target.files[0]);
    }



  checkEXPID(event: any) {
    const expString = this.htmlInputFromExp.value.expstring;
    this.apiServ.getExpID(expString)
    .subscribe(
      (data: any) => {

        this.expressionData.push(data);
      }
    );
  }


  currentImagePointer(event: any, element) {
    this.currentImageValue = element;
  }


  addPanelMetadata(event: any) {

    this.masterPanelData.serial_no = this.htmlInputFromPanel.value.serial_no;
    this.masterPanelData.alt = this.htmlInputFromPanel.value.alt;
    this.masterPanelData.description = this.htmlInputFromPanel.value.description;
    this.masterPanelData.title = this.htmlInputFromPanel.value.title;
    this.masterPanelData.img_url = this.htmlInputFromPanel.value.img_url;

    const imageFile = this.currentImageValue;

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      // const target = <any>event.target;
      // const image = target.result;
      // const parts = image.split(',');
      // const base64 = parts[1];
      console.log('base64 ', reader.result.split(',')[1]);


    };
  }


  addpanelExpData(event: any) {
    const expData = new ExpData();
      expData.expstring = this.htmlInputFromExp.value.expstring;
      expData.ExpID = this.htmlInputFromExp.value.expID;
      expData.ContentID = this.htmlInputFromExp.value.contextID;

      this.masterPanelData.exp_data.push(expData);

  }


  submitComic(event: any) {

    this.masterComicsData.title = this.htmlInputFromComic.value.title;
    this.masterComicsData.plan = this.htmlInputFromComic.value.plan;
    this.masterComicsData.panel_data.push(this.masterPanelData);

    console.log('this.masterComicsData', this.masterComicsData);

    this.apiServ.postUploadImage(this.masterComicsData)
    .subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }
}


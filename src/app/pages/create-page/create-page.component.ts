import { Router } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { QuestionService } from "src/app/service/question/question.service";
import { Question } from "src/app/models/question";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';
import * as RecordRTC from "recordrtc";
export interface Speech2TextResponseDTO {
  transcript: string;
}
@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.css"],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CreatePageComponent implements OnInit {
  selectedCategories: number[] = [];
  questionForm!: FormGroup;
  title = "audio-record";
  record: any;
  recording = false;
  url: any;
  error: any;
  constructor(
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks = [];
  private isRecording = false;

  categories = [
    { value: 1, viewValue: "Frontend" },
    { value: 2, viewValue: "Backend" },
    { value: 3, viewValue: "HR" },
    { value: 4, viewValue: "Soft skills" },
    { value: 5, viewValue: "QA testing" },
    { value: 6, viewValue: "Database" },
    { value: 7, viewValue: "DevOps" },
  ];
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  startRecording() {
    this.recording=true;
    let mediaConstrains = {
      video:false,
      audio:true,
    };
    navigator.mediaDevices
    .getUserMedia(mediaConstrains)
    .then(this.successCallBack.bind(this), this.errorCallBack.bind(this));
  }
 successCallBack(stream: MediaStream) {
  var options: RecordRTC.Options = {
    mimeType: 'audio/webm',
    numberOfAudioChannels: 1,
  };
  var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  this.record = new StereoAudioRecorder(stream, options);
  this.record.record();
}

stopRecording() {
  this.recording = false;
  this.record.stop(this.processRecording.bind(this));
}
processRecording(blob: Blob) {
  this.url = URL.createObjectURL(blob);

  this.uploadAudio(blob);
}
  errorCallBack(error:any) {
    this.error='can not play';
  }
  
  descritioAudio :string=''
  uploadAudio(blob: Blob) {
      const file = new File([blob], 'recorded_audio.flac', { type: 'flac' });
      console.log("audioType: " + file.type +file);
    this.questionService.uploadAudioFile(file).subscribe((response) => {
      console.log(response);
      this.descritioAudio = response.transcript;
    });
  }

  

  
  ngOnInit() {
    this.createForm();
    const categoryControl = this.questionForm.get("category");
    if (categoryControl) {
      categoryControl.valueChanges.subscribe((val) => {
        this.selectedCategories = val.map(Number);
      });
    }
  }

  createForm() {
    this.questionForm = this.formBuilder.group({
      categoryIds: [[]],
      title: [""],
      description: [""],
    });
  }

  updateSelectedCategories(category: number) {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      // Category already exists, remove it
      this.selectedCategories.splice(index, 1);
    } else {
      // Category doesn't exist, add it
      this.selectedCategories.push(category);
    }
  }

  isSolved: boolean = false;
  addQuestion() {
    console.log("merge?");
    const selectedCategories = this.questionForm.value.categoryIds;
    const question: Question = {
      categoryIds: selectedCategories || [],
      title: this.questionForm.value.title || "",
      description: this.questionForm.value.description || "",
      email: this.questionForm.value.email || "",
      localDateTime: this.questionForm.value.date || "",
      solved: this.isSolved,
    };
    if (this.title.length < 4) {
      return;
    }
    
    
    console.log("Question Category:", question.categoryIds);
    this.questionService.addQuestion(question).subscribe(() => {
      this.navigateToForum();
    });
  }

  navigateToForum() {
    this.router.navigate(["forum"], { queryParams: { myPosts: true } });
  }
  onSubmit(formValue: any) {
    console.log("Selected categories:", formValue.categorySelect);
  }
  nav_back() {
    window.history.back();
  }
}

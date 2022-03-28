import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Comment } from '@angular/compiler';
// import { trigger, state, style, animate, transition } from '@angular/animations';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility(),
    expand()]
})
export class DishdetailComponent implements OnInit {
    errMess: any;
    dishcopy!: Dish;
    commentForm!: FormGroup;
    dish!: Dish;
    dishIds!: string[];
    prev!: string;
    next!: string;
    comment!:Comment;
    status!: number;
    value!:number;
    comments!:any;
    visibility = 'shown';
    @ViewChild('cform')
  commentFormDirective!: NgForm;


    formErrors = {
      'author': '',
      'comment': '', 
    };
  
    validationMessages = {
      'author': {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
      },
      'comment': {
       'required':      'Last Name is required.',
    }
  }

  constructor(public fa: FormBuilder,private dishService: DishService,
    private route:ActivatedRoute,
    private location:Location,@Inject('baseURL') private baseURL:any) { }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess)
      }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }
   
  createForm() {
    this.commentForm = this.fa.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    });
      //  this.commentForm.value
      //  .subscribe(data => this.onValueChanged(data));
      //  this.onValueChanged();
}

  onSubmit(): void {
    this.dishcopy.comments.push(this.comments);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish ,
                   this.dishcopy,
                  this.errMess = <any>errmess
                });
    // this.feedbackFormDirective.resetForm();
    
  }

}

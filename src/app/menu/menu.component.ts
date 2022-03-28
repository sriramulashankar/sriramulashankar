import { Component, OnInit,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes'
import { DishService } from '../services/dish.service';
import { flyInOut } from '../animations/app.animation';


  @Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
      animations: [
        flyInOut()
      ]
  })

export class MenuComponent implements OnInit {
  errMess!: string;
  dishes!: Dish[];
  // baseURL:any;
  // selectedDish!: Dish;

   constructor ( private dishService:DishService,
    @Inject('baseURL') private baseURL:any) {}
   
   ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes)=> this.dishes = dishes,
    errmess => this.errMess = <any>errmess);
  }
  
  // onSelect(dish:Dish){
  //   this.selectedDish=dish;

  // }
 
  }



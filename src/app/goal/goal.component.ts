import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Goal} from '../goals';
import {GoalService} from '../goal-servcie/goal.service';
import {AlertService} from '../alert-service/alert.service';
import { Quote } from '../quote-class/quote';
import {QuoteRequestService} from '../quote-http/quote-request.service';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  title:string ="Goals";
  goals:Goal[]=[];
  quote:Quote;
  alertService:AlertService;

  goToUrl(id){
    this.router.navigate(['/goals',id]);
  }
  
  toggleDetails(index){
    this.goals[index].showDescription=!this.goals[index].showDescription;
  }
  completeGoal(isComplete,index){
    if(isComplete){
      this.goals.splice(index,1);
    }
  }
  deleteGoal(isComplete,index){
    if(isComplete){
      let toDelete=confirm(`Are you sure you want to delete ${this.goals[index].name}?`);
      if(toDelete){
        this.goals.splice(index,1);
        this.alertService.alertMe('This goal has been deleted');
      }
    }
  }
  addNewGoal(goal){
    let goalLength=this.goals.length;
    goal.id=goalLength+1;
    goal.completeDate=new Date(goal.completeDate);
    this.goals.push(goal);
  }
  
  
  constructor(goalService:GoalService,alertService:AlertService,private quoteService:QuoteRequestService,private router:Router){
    this.goals=goalService.getGoals();
    this.alertService=this.alertService;
  }
  ngOnInit(): void {
    this.quoteService.quoteRequest(); 
    this.quote=this.quoteService.quote; 
  }
}
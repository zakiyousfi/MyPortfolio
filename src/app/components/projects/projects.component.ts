import { Component } from '@angular/core';
import { Tools } from 'src/app/models/tools';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  firstPoject: Tools[] = [
   
    {
      name: 'GIT',
    },
    {
      name: 'Html',
    },
    {
      name: 'CSS',
    },
    {
      name: 'JS',
    },
    {
      name: 'Bootstrap',
    },
    {
      name: 'GitHub',
    },
  ];

  secoundProject: Tools[] = [
    {
      name: 'Git',
    },
    {
      name: 'HTML',
    },
    {
      name: 'CSS',
    },
    {
      name: 'JS',
    },
    {
      name: 'BootStrap',
    },
    
    {
      name: 'GITHub',
    },
  ];

  thirdProject: Tools[] = [
    {
      name: 'HTML',
    },
    {
      name: 'SCSS',
    },
    {
      name: 'JS',
    },
    {
      name: 'GIT',
    },
    {
      name: ' BootStrap',
    },
  ];
  FourProject: Tools[] = [
    {
      name: 'HTML',
    },
    {
      name: 'SCSS',
    },
    {
      name: 'TypeScript',
    },
    {
      name: 'Angular',
    },
    {
      name: 'Aungular Material',
    },
    {
      name: 'Git',
    },
    {
      name: 'GitHub',
    },
    {
      name: 'BootStrap',
    },
  ];

  projectOne = () => {
    window.open(environment.projectOne, '_blank');
  };

  projectTwo = () => {
    window.open(environment.projectTwo, '_blank');
  };

  projectThree = () => {
    window.open(environment.projectThree, '_blank');
  };
  projectFour = () => {
    window.open(environment.projectFour, '_blank');
  };
}

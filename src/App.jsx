import { useState } from 'react';
// import NewProject from "./components/NewProject.jsx";
import ProjectSidebar from "./components/ProjectsSidebar.jsx";
import NoProject from "./components/NoProject.jsx";
import NewProject from './components/NewProject.jsx';
import SelectedProject from './components/selectedProject.jsx';

function App() {

  const [projectsState, setProjectState] = useState({
    selecetedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selecetedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectedProject(id){
    setProjectState((prevState) =>{
      return {
        ...prevState,
        selecetedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState(prevState =>{
      return{
        ...prevState,
        selecetedProjectId : null,
      };
    });
  }

  function handleCancelAddProject(){
    setProjectState((prevState) =>{
      return {
        ...prevState,
        selecetedProjectId: undefined
      };
    });
  }


  function handleAddProject(projectData) {
    setProjectState(prevState =>{
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selecetedProjectId: undefined,
        projects: [...prevState.projects, newProject  ]
       };
    });
  }

  function handleDeleteProject(){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selecetedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selecetedProjectId
        ),
      };
    });
  }

  
  console.log(projectsState);
  

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selecetedProjectId);

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if(projectsState.selecetedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if (projectsState.selecetedProjectId === undefined) {
    content = <NoProject onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject} 
        projects={projectsState.projects}
        onSelectedProject={handleSelectedProject}
        selectedProjectId={projectsState.selecetedProjectId}
      />
      {/* <NoProject onStartAddProject={handleStartAddProject}/> */}
      {/* <NewProject/> */}
      {content}
    </main>
  );
}

export default App;

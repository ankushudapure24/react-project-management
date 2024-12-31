import { useState } from 'react';
// import NewProject from "./components/NewProject.jsx";
import ProjectSidebar from "./components/ProjectsSidebar.jsx";
import NoProject from "./components/NoProject.jsx";
import NewProject from './components/NewProject.jsx';

function App() {

  const [projectsState, setProjectState] = useState({
    selecetedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectState(prevState =>{
      return{
        ...prevState,
        selecetedProjectId : null,
      };
    });
  }

  let content;

  if(projectsState.selecetedProjectId === null) {
    content = <NewProject />
  }else if (projectsState.selecetedProjectId === undefined) {
    content = <NoProject onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject}/>
      {/* <NoProject onStartAddProject={handleStartAddProject}/> */}
      {/* <NewProject/> */}
      {content}
    </main>
  );
}

export default App;

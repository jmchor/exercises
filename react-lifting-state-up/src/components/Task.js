import { useState } from 'react';

function Task({key, task, toggleTask}) {
	// const [taskCompleted, setTaskCompleted] = useState(false);

	// const toggleTask = () => setTaskCompleted(!taskCompleted);

	return (
		<div className='task-card'>
			<div className='task-card-half'>
				<h1>{task.name}</h1>
				{task.isDone ? <span>DONE </span> : <span>PENDING ⌛</span>}

				<h2>Task Description</h2>
				<p>{task.description}</p>

				<button className='add' onClick={() => toggleTask(task._id)}>
					{task.isDone ? <span>UNDO </span> : <span>✔️</span>}
				</button>
			</div>
		</div>
	);
}

export default Task;

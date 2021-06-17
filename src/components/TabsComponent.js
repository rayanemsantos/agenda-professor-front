import '../App.css'

function TabsComponent({handleConfigTab, handleScheduleTab, handleFrequenceTab }) {
  return (
        <footer>
			<nav>
				<ul>
					<li className="bottom-menu button" onClick={handleConfigTab}>
						<a href="#"><i className="fa fa-cog"></i> ajustes</a>
					</li>
					<li className="bottom-menu button" onClick={handleScheduleTab}>
						<a href="#"><i className="fa fa-book"></i> agenda</a>
					</li>
					<li className="bottom-menu button" onClick={handleFrequenceTab}>
						<a href="frequencia.html"><i className="fa fa-tasks"></i> frequência</a>
					</li>
				</ul>
			</nav>
        </footer>        
  );
}

export default TabsComponent;
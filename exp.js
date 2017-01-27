function runExperiment(){
	
	serverPsych.request(function (settings){
			    
		settings.timeline.forEach(function(block, idx, timeline){
			if(block.name == "SJ1"){
				block.timeline = []
				{
					stimuli: ["", ""]
						
				}
				
				
				function findSounds(sons, diff){
					var bonsons={};
					bonsons.A = []
					bonsons.NA = []
					
					
					
					//remplir bonsons!
					sons.forEach(function (nom, idx){
						if( nom.includes("_"+diff+"_") ){

							if( nom.includes("/A_") ){
								bonsons.A.push(nom);
							}
							else if( nom.includes("/NA_") ){
								bonsons.NA.push(nom);
							}
						}
					});
					return bonsons
				}
				
				var candidats = findSounds(settings.other.resources, settings.extra_parameters.difficulty);
				
				
				for (var i=0; i < block.length; i++)
		    	{
					var trial= {}
					trial.stimuli=[]
					//bien remplir trial.stimuli...
					
					
					block.timeline.push(trial)
		    	}
				
				
			}
			
		});
				
		jsPsych.init({
			timeline: settings.timeline,
			on_finish:function(data){
				serverPsych.save({
					data:data
				})
			},
			display_element: $('#jsPsychTarget'),
			on_trial_start:function(){
				$("#jsPsychTarget")[0].scrollIntoView();
			}
		});
	});
}
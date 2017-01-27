function runExperiment(){
	
	serverPsych.request(function (settings){
			    
		settings.timeline.forEach(function(block, idx, timeline){
			
			var ma_timeline;
			
			
			if(block.name == "SJ1"){
				block.timeline = []
				
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
					
					bonsons.A = jsPsych.randomization.shuffle(bonsons.A);
					bonsons.NA = jsPsych.randomization.shuffle(bonsons.NA);
					
					return bonsons
				}
				
				var candidats = findSounds(settings.resources.audio, settings.extra_parameters.difficulty);
				
				
				function cycle(array){
					var element = array.pop();
					array.unshift(element);
					return element;
				}
				
				
				for (var i=0; i < block.length; i++){
					
					var type = i % 4;
					var trial = {
						stimuli: []
					}
					
					
					if(type === 0){
						//type NA NA
						trial.stimuli[ cycle(candidats.NA)  ,  cycle(candidats.NA)  ];
					}
					else if(type === 1){
						//type NA A
						trial.stimuli[ cycle(candidats.NA)  ,  cycle(candidats.A)  ];
					}
					else if(type ===2){
						//type A A
						trial.stimuli[ cycle(candidats.A)  ,  cycle(candidats.A)  ];
					}
					else if(type === 3){
						//type A NA
						trial.stimuli[ cycle(candidats.A)  ,  cycle(candidats.NA)  ];
					}
					
					block.timeline.push(trial)
		    	}
				
				ma_timeline = block.timeline;
				
			}
			else if(block.name == "SJ2"){
				block.timeline = ma_timeline;
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
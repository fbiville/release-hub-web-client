(function() {
	var nodes = null;
	var edges = null;
	var options = null;
	var graph = null;

	nodes = [
		{id: 1, label: 'euler', group: 'dirty'},
		{id: 2, label: 'common-api', group: 'dirty'},
		{id: 3, label: 'common', group: 'clean'}
	];

	edges = [
		{from: 1, to: 2, label: '1.2.1-SNAPSHOT'},
		{from: 2, to: 3, label: '3.0.1'}
	];

	options = {
		stabilize: false,
		selectable: true,
		edges: {
			length: 120,
			width: 3,
			style: 'arrow',
			color: 'black'
		},
		nodes: {
			fontFace: 'arial',
			shape: 'circle',
			color: {
				color: 'black',
				background: 'white'
			}
		},
		groups: {
			"clean": {
				fontSize: 18,
				color: {
					border: 'green'
				}
			},
			dirty: {
				color: {
					border: 'red'
				}
			}
		}
	};

	var container = document.getElementById('graph');
	var data = {
		nodes: nodes,
		edges: edges
	};
	graph = new vis.Graph(container, data, options);

	// events
	graph.on('select', function (properties) {
		var selectedNode = properties.nodes[0],
		    $heading = $("#info-header"),
		    $container = $("#info-container");
		
		if (selectedNode === 1) {
			$heading.html('Latest changes in <strong>euler</strong>.');
			$container.html('<p><span class="glyphicon glyphicon-warning-sign"></span> Has to be released again after changes on <strong>common-api</strong>.</p>');
			return;
		}
		
		if (selectedNode === 2) {
			$heading.html('Latest changes in <strong>common-api</strong>.');
			$container.html('<p><span class="glyphicon glyphicon-warning-sign"></span> Has to be released again after several changes since <a href="#">last release</a>.</p>'+
			'<ul class="list-group">'+
				'<li class="list-group-item"><span class="glyphicon glyphicon-user"></span> Jonathan committed: <em>"Hotfix for <a href="#">COMMONAPI-78</a> after urgent production bug."</em></li>'+
				'<li class="list-group-item"><span class="glyphicon glyphicon-user"></span> Stuart committed: <em>"Fix after QA feedback <a href="#">COMMONAPI-53</a>."</em></li>'+
			'</ul>');
			return;
		}
		
		if (selectedNode === 3) {
			$heading.html('Latest changes in <strong>common</strong>.');
			$container.html('<p><span class="glyphicon glyphicon-check"></span> No changes since <a href="#">last release</a>.</p>');
			return;
		}
	});
})();

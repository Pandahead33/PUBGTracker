function toggleDiv() {
	
	var x = document.getElementById("hide");
	
	if(x.style.display === "block") {
		x.style.display = "none"; 
	} else {
		x.style.display = "block";
	}
	
}

function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el);
}

function fetcher() {
	
const ul = document.getElementById('authors');
const url = 'https://api.pubg.com/shards/pc-na/players?filter[playerNames]='
var matchurl = 'https://api.pubg.com/shards/steam/matches/'

var players = document.getElementById("playerinput").value.split('\n');//['Zach329', 'dperez3139', 'Wizingwizard', 'AskForChaos']

var matchId = 0; 
var table = document.getElementById('stats');
	
fetch(url + document.getElementById('PUBGuser').value, {
	method: 'get',
	headers: new Headers({
		'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0OTI0ODM4MC05ZmZmLTAxMzYtY2EzOC0wN2NiYmEyMzM3ZDEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTM3NTU2NzUzLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImRlbmJpcmQifQ.oTEqkj4E1f_dPAhbEuUygIhwx7Pas2QaxhvmgW0Fqzg',
		'Accept' : 'application/vnd.api+json'
	})
	})
	.then((resp) => resp.json())
	.then(function(res) {
		console.log(res.data[0]); 
		document.getElementById('test').innerHTML = res.data[0].relationships.matches.data[0].id; 
		
		console.log(document.getElementById('test').innerHTML);
		matchId = res.data[0].relationships.matches.data[0].id; 
		
		console.log(matchurl + matchId); 
		
		var full = matchurl + matchId;
		console.log(full); 	
		
		//
		fetch('https://api.pubg.com/shards/steam/matches/' + document.getElementById('test').innerHTML, {
		method: 'get',
		headers: new Headers({
			'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0OTI0ODM4MC05ZmZmLTAxMzYtY2EzOC0wN2NiYmEyMzM3ZDEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTM3NTU2NzUzLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImRlbmJpcmQifQ.oTEqkj4E1f_dPAhbEuUygIhwx7Pas2QaxhvmgW0Fqzg',
			'Accept' : 'application/vnd.api+json'
		})
		})
		.then((resp) => resp.json())
		.then(function(res) {
			console.log(res);
			var i; 
			table.innerHTML = table.rows[0].innerHTML;
			for(i = 0; i < res.included.length; i++) 
			{
				if(res.included[i].type === "participant")
				{					
					
					if(document.getElementById("displayAll").checked || players.includes(res.included[i].attributes.stats.name)) {
											
						
						
						var row = table.insertRow(table.rows.length);
						var nameCell = row.insertCell(0);
						var killCell = row.insertCell(1);
						var damageCell = row.insertCell(2);
						var winPlaceCell = row.insertCell(3);
						var timeSurvivedCell = row.insertCell(4);
						var DBNOCell = row.insertCell(5);
						var assistCell = row.insertCell(6);

						nameCell.innerHTML = res.included[i].attributes.stats.name;
						killCell.innerHTML = res.included[i].attributes.stats.kills; 
						damageCell.innerHTML = res.included[i].attributes.stats.damageDealt;
						winPlaceCell.innerHTML = res.included[i].attributes.stats.winPlace;
						timeSurvivedCell.innerHTML = (res.included[i].attributes.stats.timeSurvived / 60).toFixed(2);
						DBNOCell.innerHTML = res.included[i].attributes.stats.DBNOs;
						assistCell.innerHTML = res.included[i].attributes.stats.assists;
					}
			}
			document.getElementById("playerCount").innerHTML = "Showing " + table.rows.length-1 + ' players.';
			}
		})
		.catch(function(error) {
			console.log(error);
		});
		
		//
		
	})
	.catch(function(error) {
		console.log(error);
	});
	
	

}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("stats");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
	
function sortTableNumber(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("stats");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
	
function search() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("stats");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

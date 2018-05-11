<li id="choix"><label>Choix: </label>
<ol class="checkboxes">
        <li><input value="choix_1" type="checkbox" onclick="Change()" class="checkboxlist" name="choix[]" id="choix_1" />choix 1</li>

	<li><input value="choix_2" type="checkbox" onclick="Change()" class="checkboxlist" name="choix[]" id="choix_2" />choix 2</li>

	<li><input value="choix_3" type="checkbox" onclick="Change()" class="checkboxlist" name="choix[]" id="choix_3" />choix 3</li>
</ol>
</li>

<div id="madiv"  style="display:none"><p>blabla</p></div>

<script type="text/javascript">
function Change() {

if ((document.getElementById('choix_1').checked) || (document.getElementById('choix_2').checked) || (document.getElementById('choix_3').checked)) {
document.getElementById('madiv').style.display="block";
}
else {
document.getElementById('madiv').style.display="none";
}
}
</script>






if ((document.getElementById('icono').checked)  {
document.getElementById('image').style.display="block";
}
else {
document.getElementById('image').style.display="none";
}


if ((document.getElementById('webo').checked)  {
document.getElementById('web').style.display="block";
}
else {
document.getElementById('web').style.display="none";
}


if ((document.getElementById('biblio').checked)  {
document.getElementById('livre').style.display="block";
}
else {
document.getElementById('livre').style.display="none";
}
}

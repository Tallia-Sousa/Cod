const search = (titulo) => {
	const cursosContainer = document.getElementById('cursos-container');
	const cursos = cursosContainer.getElementsByClassName('box');

	Array.from(cursos).forEach(curso => {//intera ocada elemento cursos e pega
		const tituloCurso = curso.querySelector('h3').textContent.toLowerCase();
		const shouldShow = tituloCurso.includes(titulo);
		curso.style.display = shouldShow ? 'block' : 'none';
	})
}

document.getElementById('searchButton').addEventListener('click', function (event) {
	event.preventDefault();
	const titulo = document.getElementById('search').value.trim().toLowerCase();
	search(titulo);
});

document.getElementById('search').addEventListener('input', function () {
	const titulo = document.getElementById('search').value.trim().toLowerCase();
	search(titulo);
});

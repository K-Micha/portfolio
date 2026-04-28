const arrowContainer = document.getElementById('arrow-container');
const skills = document.getElementById('skills');

arrowContainer.addEventListener('click', function () {
  skills.scrollIntoView({ behavior: 'smooth' });
});
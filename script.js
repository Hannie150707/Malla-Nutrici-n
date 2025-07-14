// script.js
document.addEventListener('DOMContentLoaded', function() {
    const subjects = document.querySelectorAll('.subject');
    const approvedSubjects = new Set();

    subjects.forEach(subject => {
        // Verificar si el sujeto tiene requisitos
        const requisites = JSON.parse(subject.dataset.requisites);
        
        if (requisites.length > 0) {
            // Mostrar información de requisitos
            const requisitesInfo = document.createElement('div');
            requisitesInfo.className = 'requisites-info';
            requisitesInfo.textContent = `Requisitos: ${requisites.join(', ')}`;
            subject.appendChild(requisitesInfo);
            
            // Bloquear si no se cumplen los requisitos
            if (!areRequisitesMet(requisites, approvedSubjects)) {
                subject.classList.add('locked');
            }
        }

        // Agregar evento de clic
        subject.addEventListener('click', function() {
            if (this.classList.contains('locked')) return;
            
            const code = this.textContent.split(' ')[0];
            
            if (this.classList.contains('approved')) {
                // Desaprobar
                this.classList.remove('approved');
                approvedSubjects.delete(code);
            } else {
                // Aprobar
                this.classList.add('approved');
                approvedSubjects.add(code);
            }
            
            // Actualizar estado de todos los ramos
            updateSubjectsStatus();
        });
    });

    function areRequisitesMet(requisites, approvedSet) {
        return requisites.every(req => approvedSet.has(req));
    }

    function updateSubjectsStatus() {
        subjects.forEach(subject => {
            const requisites = JSON.parse(subject.dataset.requisites);
            
            if (requisites.length > 0 && !subject.classList.contains('approved')) {
                if (areRequisitesMet(requisites, approvedSubjects)) {
                    subject.classList.remove('locked');
                    subject.classList.add('unlocked');
                    
                    // Eliminar la clase de animación después de que termine
                    setTimeout(() => {
                        subject.classList.remove('unlocked');
                    }, 500);
                } else {
                    subject.classList.add('locked');
                }
            }
        });
    }

    // Opcional: Guardar en localStorage
    function saveProgress() {
        localStorage.setItem('approvedSubjects', JSON.stringify([...approvedSubjects]));
    }

    function loadProgress() {
        const saved = localStorage.getItem('approvedSubjects');
        if (saved) {
            const savedArray = JSON.parse(saved);
            savedArray.forEach(code => {
                approvedSubjects.add(code);
                document.querySelectorAll('.subject').forEach(subject => {
                    if (subject.textContent.startsWith(code)) {
                        subject.classList.add('approved');
                    }
                });
            });
            
            updateSubjectsStatus();
        }
    }

    // Cargar progreso al inicio
    loadProgress();

    // Guardar progreso cuando cambia
    document.addEventListener('click', saveProgress);
});

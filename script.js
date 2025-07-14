// Malla de cursos y requisitos
const cursos = [
  { id: "EG-011", nombre: "Español General", requisitos: [] },
  { id: "RR-150", nombre: "Arte o Deporte", requisitos: [] },
  { id: "MM-112", nombre: "Matemáticas", requisitos: [] },
  { id: "BI-123", nombre: "Biología Médica", requisitos: [] },
  { id: "QQ-111", nombre: "Química Médica I", requisitos: [] },
  { id: "IN-101", nombre: "Inglés I", requisitos: [] },
  { id: "QQ-112", nombre: "Química Médica II", requisitos: ["QQ-111"] },
  { id: "FF-101", nombre: "Filosofía", requisitos: [] },
  { id: "SC-101", nombre: "Sociología", requisitos: [] },
  { id: "HH-101", nombre: "Historia de Honduras", requisitos: [] },
  { id: "BI-130", nombre: "Educación Ambiental", requisitos: [] },
  { id: "QQ-321", nombre: "Bioquímica", requisitos: ["QQ-112", "BI-123", "MM-112"] },
  { id: "MM-241", nombre: "Bioestadística", requisitos: ["MM-112"] },
  { id: "NUT-101", nombre: "Intro Nutrición y Bioética", requisitos: ["QQ-111", "BI-123"] },
  { id: "NUT-102", nombre: "Desarrollo Humano", requisitos: ["NUT-101"] },
  { id: "NUT-011", nombre: "Metodología Investigación", requisitos: ["EG-011", "MM-241"] },
  { id: "NUT-103", nombre: "Antropología Alimentaria", requisitos: ["FF-101", "SC-101", "NUT-101"] },
  { id: "NUT-012", nombre: "Morfología Aplicada", requisitos: ["QQ-321", "BI-123"] },
  { id: "NUT-104", nombre: "Nutrición Básica", requisitos: ["QQ-321", "NUT-101"] },
  { id: "IN-102", nombre: "Inglés II", requisitos: ["IN-101"] },
  { id: "RR-190", nombre: "Optativa Humanidades", requisitos: [] },
  { id: "NUT-113", nombre: "Socioeconomía Nutricional", requisitos: ["NUT-103"] },
  { id: "NUT-114", nombre: "Computación Nutrición", requisitos: ["MM-241", "NUT-104"] },
  { id: "NUT-204", nombre: "Evaluación Estado Nutricional", requisitos: ["NUT-104", "NUT-011", "NUT-114"] },
  { id: "NUT-205", nombre: "Bioquímica Alimentos", requisitos: ["QQ-321", "NUT-104"] },
  { id: "NUT-206", nombre: "Microbiología Alimentos", requisitos: ["NUT-104", "NUT-012"] },
  { id: "NUT-207", nombre: "Nutrición Ciclo de Vida", requisitos: ["NUT-104", "NUT-012"] },
  { id: "NUT-208", nombre: "Fisiopatología Aplicada", requisitos: ["NUT-104", "NUT-012"] },
  { id: "NUT-209", nombre: "Selección Alimentos I", requisitos: ["NUT-104"] },
  { id: "NUT-307", nombre: "Nutrición Pública", requisitos: ["NUT-204", "NUT-207"] },
  { id: "NUT-306", nombre: "Tecnología de Alimentos", requisitos: ["NUT-205", "NUT-206"] },
  { id: "NUT-302", nombre: "Comunicación Nutrición", requisitos: ["NUT-102", "NUT-011", "NUT-207"] },
  { id: "NUT-309", nombre: "Selección Alimentos II", requisitos: ["NUT-209"] },
  { id: "NUT-310", nombre: "Dietética", requisitos: ["NUT-207", "NUT-209"] },
  { id: "IN-103", nombre: "Inglés III", requisitos: ["IN-102"] },
  { id: "NUT-311", nombre: "Epidemiología", requisitos: ["NUT-011"] },
  { id: "NUT-407", nombre: "Investigación Pública", requisitos: ["NUT-307"] },
  { id: "NUT-402", nombre: "Promoción de la Salud", requisitos: ["NUT-302", "NUT-307"] },
  { id: "NUT-506", nombre: "Seguridad Alimentaria", requisitos: ["NUT-311"] },
  { id: "NUT-507", nombre: "Nutrición Comunitaria", requisitos: ["NUT-311", "NUT-402"] },
  { id: "NUT-510", nombre: "Dietoterapia Niño", requisitos: ["NUT-204", "NUT-207", "NUT-310", "NUT-208"] },
  { id: "NUT-511", nombre: "Dietética Institucional", requisitos: ["NUT-309", "NUT-310", "NUT-207", "NUT-204"] },
  { id: "NUT-603", nombre: "Dietoterapia Adulto", requisitos: ["NUT-207", "NUT-204", "NUT-208", "NUT-310"] },
  { id: "NUT-601", nombre: "Proyectos Seguridad Alimentaria", requisitos: ["NUT-506", "NUT-507", "NUT-407"] },
  { id: "NUT-512", nombre: "Nutrición Preventiva", requisitos: ["NUT-402"] },
  { id: "NUT-602", nombre: "Formulación Política SAN", requisitos: ["NUT-507", "NUT-510", "NUT-307", "NUT-603"] },
  { id: "NUT-605", nombre: "Administración Servicios", requisitos: ["NUT-511"] },
  { id: "NUT-701", nombre: "Práctica Institucional", requisitos: cursos.map(c => c.id) },
  { id: "NUT-801", nombre: "Servicio Social Comunitario", requisitos: ["NUT-701"] }
];

// Estado de cursos aprobados
let aprobados = new Set();

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "ramo";

    if (curso.requisitos.some(req => !aprobados.has(req))) {
      div.classList.add("bloqueado");
    } else if (aprobados.has(curso.id)) {
      div.classList.add("aprobado");
    }

    div.textContent = `${curso.id}\n${curso.nombre}`;
    div.onclick = () => {
      if (!curso.requisitos.some(req => !aprobados.has(req))) {
        if (aprobados.has(curso.id)) {
          aprobados.delete(curso.id);
        } else {
          aprobados.add(curso.id);
        }
        renderMalla();
      }
    };
    contenedor.appendChild(div);
  });
}

renderMalla();

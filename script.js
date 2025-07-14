const ramos = {
  "EG-011": [],
  "RR-150": [],
  "MM-112": [],
  "BI-123": [],
  "QQ-111": [],
  "IN-101": [],
  "QQ-112": ["QQ-111"],
  "FF-101": [],
  "SC-101": [],
  "HH-101": [],
  "BI-130": [],
  "QQ-321": ["QQ-112", "BI-123", "MM-112"],
  "MM-241": ["MM-112"],
  "NUT-101": ["QQ-111", "BI-123"],
  "NUT-102": ["NUT-101"],
  "NUT-011": ["EG-011", "MM-241"],
  "NUT-103": ["FF-101", "SC-101", "NUT-101"],
  "NUT-012": ["QQ-321", "BI-123"],
  "NUT-104": ["QQ-321", "NUT-101"],
  "IN-102": ["IN-101"],
  "RR-190": [],
  "NUT-113": ["NUT-103"],
  "NUT-114": ["MM-241", "NUT-104"],
  "NUT-204": ["NUT-104", "NUT-011", "NUT-114"],
  "NUT-205": ["QQ-321", "NUT-104"],
  "NUT-206": ["NUT-104", "NUT-012"],
  "NUT-207": ["NUT-104", "NUT-012"],
  "NUT-208": ["NUT-104", "NUT-012"],
  "NUT-209": ["NUT-104"],
  "NUT-307": ["NUT-204", "NUT-207"],
  "NUT-306": ["NUT-205", "NUT-206"],
  "NUT-302": ["NUT-102", "NUT-011", "NUT-207"],
  "NUT-309": ["NUT-209"],
  "NUT-310": ["NUT-207", "NUT-209"],
  "IN-103": ["IN-102"],
  "NUT-311": ["NUT-011"],
  "NUT-407": ["NUT-307"],
  "NUT-402": ["NUT-302", "NUT-307"],
  "NUT-506": ["NUT-311", "NUT-401"], // Nota: NUT-401 no aparece en tu lista, ¿es un error?
  "NUT-507": ["NUT-311", "NUT-402"],
  "NUT-510": ["NUT-204", "NUT-207", "NUT-310", "NUT-208"],
  "NUT-511": ["NUT-309", "NUT-310", "NUT-207", "NUT-204"],
  "NUT-603": ["NUT-207", "NUT-204", "NUT-208", "NUT-310"],
  "NUT-601": ["NUT-506", "NUT-507", "NUT-407"],
  "NUT-512": ["NUT-402"],
  "NUT-602": ["NUT-507", "NUT-510", "NUT-307", "NUT-603"],
  "NUT-605": ["NUT-511"],
  "NUT-701": ["NUT-605", "NUT-512", "NUT-602", "NUT-601"],
  "NUT-801": ["NUT-701"]
};

const estado = {};

function crearMalla() {
  const contenedor = document.getElementById('malla');
  Object.keys(ramos).forEach(codigo => {
    const boton = document.createElement('button');
    boton.className = 'ramo bloqueado';
    boton.id = codigo;
    boton.innerText = codigo;
    boton.onclick = () => aprobarRamo(codigo);
    contenedor.appendChild(boton);

    // Inicializa como no aprobado
    estado[codigo] = false;
  });

  // Activar los que no tienen requisitos
  actualizarDisponibilidad();
}

function aprobarRamo(codigo) {
  if (document.getElementById(codigo).classList.contains('bloqueado')) return;

  estado[codigo] = true;
  document.getElementById(codigo).classList.remove('bloqueado');
  document.getElementById(codigo).classList.add('aprobado');
  document.getElementById(codigo).disabled = true;
  actualizarDisponibilidad();
}

function actualizarDisponibilidad() {
  Object.keys(ramos).forEach(codigo => {
    const requisitos = ramos[codigo];
    const cumplidos = requisitos.every(req => estado[req]);
    const boton = document.getElementById(codigo);
    if (estado[codigo]) return;
    if (requisitos.length === 0 || cumplidos) {
      boton.classList.remove('bloqueado');
    } else {
      boton.classList.add('bloqueado');
    }
  });
}

window.onload = crearMalla;

// Seleção dos elementos HTML por id
const elements = {
  promptTitle: document.getElementById('prompt-title'),
  promptContent: document.getElementById('prompt-content'),
  titleWrapper: document.getElementById('title-wrapper'),
  contentWrapper: document.getElementById('content-wrapper'),
  btnOpen: document.getElementById('btn-open'),
  btnCollapse: document.getElementById('btn-collapse'),
};

// Funções para abrir/fechar a sidebar
function openSidebar() {
  const app = document.querySelector('.app');
  if (!app) return;
  app.classList.remove('sidebar-collapsed');
  // Accessibilidade
  if (elements.btnOpen) elements.btnOpen.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  const app = document.querySelector('.app');
  if (!app) return;
  app.classList.add('sidebar-collapsed');
  // Accessibilidade
  if (elements.btnOpen) elements.btnOpen.setAttribute('aria-expanded', 'false');
}

// Atualiza o estado do wrapper conforme o conteúdo do elemento
function updateEditableWrapperState(element, wrapper) {
  const hasText = element.textContent.trim().length > 0;
  wrapper.classList.toggle("is-empty", !hasText);
}

// Atualiza o estado de todos os elementos editáveis
function updateAllEditableStates() {
  updateEditableWrapperState(elements.promptTitle, elements.titleWrapper);
  updateEditableWrapperState(elements.promptContent, elements.contentWrapper);
}

// Adiciona ouvintes de evento para atualizar wrappers em tempo real
function attachAllEditableHandlers() {
  elements.promptTitle.addEventListener('input', () => {
    updateEditableWrapperState(elements.promptTitle, elements.titleWrapper);
  });
  elements.promptContent.addEventListener('input', () => {
    updateEditableWrapperState(elements.promptContent, elements.contentWrapper);
  });
  // Handlers para abrir/fechar sidebar (verifica existência)
  if (elements.btnOpen) {
    elements.btnOpen.addEventListener('click', (e) => {
      e.preventDefault();
      openSidebar();
    });
    // inicializa atributo ARIA
    elements.btnOpen.setAttribute('aria-expanded', 'true');
    elements.btnOpen.setAttribute('aria-controls', 'sidebar');
  }

  if (elements.btnCollapse) {
    elements.btnCollapse.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
    });
  }
  // Atualiza o estado inicial
  updateAllEditableStates();
}

// Função de inicialização
function init() {
  attachAllEditableHandlers();
}

// Executa a inicialização ao carregar o script
init();

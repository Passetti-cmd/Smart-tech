// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Anima o ícone do menu
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer para animações de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Anima cards individualmente
                if (entry.target.classList.contains('servico-card') || 
                    entry.target.classList.contains('porque-card') ||
                    entry.target.classList.contains('depoimento-card')) {
                    entry.target.style.animationDelay = '0s';
                }
            }
        });
    }, observerOptions);

    // Observa seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observa cards de serviços
    const servicoCards = document.querySelectorAll('.servico-card');
    servicoCards.forEach((card) => {
        observer.observe(card);
    });

    // Observa cards "Por que escolher"
    const porqueCards = document.querySelectorAll('.porque-card');
    porqueCards.forEach((card) => {
        observer.observe(card);
    });

    // Observa depoimentos
    const depoimentoCards = document.querySelectorAll('.depoimento-card');
    depoimentoCards.forEach((card) => {
        observer.observe(card);
    });

    // Observa itens de contato
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        observer.observe(item);
    });

    // Observa mapa
    const mapaContainer = document.querySelector('.mapa-container');
    if (mapaContainer) {
        observer.observe(mapaContainer);
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
            header.style.padding = '0.9rem 0';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
            header.style.padding = '1.2rem 0';
        }
        
        lastScroll = currentScroll;
    });

    // Widget WhatsApp - Mostrar/Esconder balão
    const whatsappWidget = document.getElementById('whatsappWidget');
    const whatsappBubble = document.getElementById('whatsappBubble');
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (whatsappBubble && whatsappButton) {
        let bubbleVisible = true;
        let hideTimeout;
        
        // Esconde o balão após 8 segundos
        hideTimeout = setTimeout(() => {
            whatsappBubble.style.opacity = '0';
            whatsappBubble.style.transform = 'translateY(10px)';
            bubbleVisible = false;
        }, 8000);
        
        // Mostra o balão ao passar o mouse no botão
        whatsappButton.addEventListener('mouseenter', function() {
            if (!bubbleVisible) {
                clearTimeout(hideTimeout);
                whatsappBubble.style.opacity = '1';
                whatsappBubble.style.transform = 'translateY(0)';
                bubbleVisible = true;
            }
        });
        
        // Esconde o balão ao clicar nele ou no botão
        whatsappButton.addEventListener('click', function() {
            if (bubbleVisible) {
                whatsappBubble.style.opacity = '0';
                whatsappBubble.style.transform = 'translateY(10px)';
                bubbleVisible = false;
            }
        });
        
        // Esconde o balão ao clicar fora
        document.addEventListener('click', function(e) {
            if (!whatsappWidget.contains(e.target) && bubbleVisible) {
                whatsappBubble.style.opacity = '0';
                whatsappBubble.style.transform = 'translateY(10px)';
                bubbleVisible = false;
            }
        });
    }

    // Adiciona classe visible às seções na primeira renderização
    setTimeout(() => {
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.classList.add('visible');
            }
        });
    }, 100);

    // Melhora acessibilidade - foco visível
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--cor-azul-principal)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Analytics de conversão (pode ser integrado com Google Analytics)
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Aqui você pode adicionar tracking de eventos
            console.log('WhatsApp link clicked');
        });
    });
});

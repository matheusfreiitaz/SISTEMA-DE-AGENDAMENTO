
        // DATA 
        const professionals = [
            { 
                id: 1,
                name: 'Dra. Ana Silva',
                specialty: 'Psicologia',
                category: 'psicologia',  
                rating: 4.9, 
                reviews: 127, 
                description: 'Psicóloga clínica com mais de 10 anos de experiência em terapia cognitivo-comportamental. Especialista em ansiedade, depressão e desenvolvimento pessoal.',
                image: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/ea2d0d62224300ef931d89a3af67d1a95e07b1be175173f56771f5508f64e620.png',
                price: 'R$ 180/sessão'
            },
            {
                id: 2,
                name: 'Dr. Carlos Mendes',
                specialty: 'Fisioterapia',
                category: 'fisioterapia',
                rating: 4.8,
                reviews: 94,
                description: 'Fisioterapeuta especializado em reabilitação ortopédica e esportiva. Atendimento personalizado com foco em resultados rápidos e duradouros.',
                image: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/1efd584dbf6bf7dbe787c8ac748454c2f110b453c4cd485f7fd9156f33713f0c.png',
                price: 'R$ 150/sessão'
            },
            {
                id: 3,
                name: 'Marina Costa',
                specialty: 'Massagem Terapêutica',
                category: 'massagem',
                rating: 5.0,
                reviews: 203,
                description: 'Massoterapeuta certificada em técnicas de relaxamento, massagem sueca e shiatsu. Especialista em alívio de tensões e estresse.',
                image: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/6bb2d10f23e0442df17309ac11a51f098fae97ffb5705b30f92cf86a36939390.png',
                price: 'R$ 120/sessão'
            },
            {
                id: 4,
                name: 'Dra. Juliana Santos',
                specialty: 'Nutrição',
                category: 'nutricao',
                rating: 4.9,
                reviews: 156,
                description: 'Nutricionista clínica especializada em emagrecimento saudável e reeducação alimentar. Planos personalizados e acompanhamento contínuo.',
                image: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/3f3f186076ba656b92733ce6bb59482ae966b698e70017849338956134700357.png',
                price: 'R$ 200/consulta'
            },
            {
                id: 5,
                name: 'Prof. Roberto Lima',
                specialty: 'Personal Trainer',
                category: 'personal',
                rating: 4.7,
                reviews: 88,
                description: 'Personal trainer com certificação internacional. Especialista em treino funcional, hipertrofia e condicionamento físico geral.',
                image: 'https://static.prod-images.emergentagent.com/jobs/2af4cfcd-82e9-44ee-8c4e-61f5496ec8d5/images/1efd584dbf6bf7dbe787c8ac748454c2f110b453c4cd485f7fd9156f33713f0c.png',
                price: 'R$ 100/treino'
            }
        ];

        const reviewsData = {
            1: [
                { author: 'Maria José', rating: 5, text: 'Excelente profissional! Muito atenciosa e me ajudou muito com minha ansiedade.' },
                { author: 'João Pedro', rating: 5, text: 'Recomendo demais! Terapia transformadora.' }
            ],
            2: [
                { author: 'Paula Lima', rating: 5, text: 'Melhor fisioterapeuta que já conheci. Resolveu meu problema de coluna.' },
                { author: 'Ricardo Sousa', rating: 4, text: 'Ótimo atendimento e muito profissional.' }
            ],
            3: [
                { author: 'Ana Clara', rating: 5, text: 'Massagem incrível! Saí renovada de cada sessão.' },
                { author: 'Carlos Eduardo', rating: 5, text: 'Perfeito! Técnica impecável e ambiente relaxante.' }
            ],
            4: [
                { author: 'Fernanda Costa', rating: 5, text: 'Perdi 12kg com o acompanhamento dela! Muito competente.' },
                { author: 'Lucas Martins', rating: 5, text: 'Plano alimentar personalizado e funciona de verdade!' }
            ],
            5: [
                { author: 'Marcos Vinícius', rating: 5, text: 'Treinos muito bem elaborados. Resultados rápidos!' },
                { author: 'Patrícia Alves', rating: 4, text: 'Excelente personal! Motivador e atencioso.' }
            ]
        };

        // STATE
        let currentUser = null;
        let currentProfessional = null;
        let selectedCategory = 'all';
        let bookings = [];
        let selectedTimeSlot = null;
        let isLoginMode = true;
        let pendingNavigation = null;

        // INIT
        document.addEventListener('DOMContentLoaded', () => {
            const today = new Date().toISOString().split('T')[0];
            const dateInput = document.getElementById('bookingDate');
            if (dateInput) {
                dateInput.setAttribute('min', today);
            }
            loadUser();
            renderProfessionals();
            updateStats();
        });

        // AUTH
        function checkAuthAndNavigate(section) {
            if (!currentUser) {
                pendingNavigation = section;
                showAuthModal();
            } else {
                showSection(section);
            }
        }

        function showAuthModal() {
            document.getElementById('authModal').classList.add('active');
        }

        function hideAuthModal() {
            document.getElementById('authModal').classList.remove('active');
        }

        function toggleAuthMode() {
            isLoginMode = !isLoginMode;
            const nameGroup = document.getElementById('nameGroup');
            const authTitle = document.getElementById('authTitle');
            const authButtonText = document.getElementById('authButtonText');
            const authFooterText = document.getElementById('authFooterText');

            if (isLoginMode) {
                nameGroup.style.display = 'none';
                authTitle.textContent = 'Entrar na Conta';
                authButtonText.textContent = 'Entrar';
                authFooterText.textContent = 'Não tem uma conta?';
            } else {
                nameGroup.style.display = 'block';
                authTitle.textContent = 'Criar Conta';
                authButtonText.textContent = 'Criar Conta';
                authFooterText.textContent = 'Já tem uma conta?';
            }
        }

        function handleAuth(e) {
            e.preventDefault();
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            const name = document.getElementById('authName').value;

            if (isLoginMode) {
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    const user = JSON.parse(savedUser);
                    if (user.email === email && user.password === password) {
                        currentUser = user;
                        showToast('Login realizado com sucesso!', 'success');
                        hideAuthModal();
                        updateUIAfterLogin();
                        if (pendingNavigation) {
                            showSection(pendingNavigation);
                            pendingNavigation = null;
                        }
                    } else {
                        showToast('E-mail ou senha incorretos!', 'error');
                    }
                } else {
                    showToast('Usuário não encontrado. Crie uma conta primeiro!', 'warning');
                }
            } else {
                if (!name) {
                    showToast('Por favor, preencha seu nome!', 'warning');
                    return;
                }
                const newUser = {
                    name: name,
                    email: email,
                    password: password
                };
                localStorage.setItem('user', JSON.stringify(newUser));
                currentUser = newUser;
                showToast('Conta criada com sucesso!', 'success');
                hideAuthModal();
                updateUIAfterLogin();
                if (pendingNavigation) {
                    showSection(pendingNavigation);
                    pendingNavigation = null;
                }
            }

            document.getElementById('authForm').reset();
        }

        function updateUIAfterLogin() {
            document.getElementById('headerActions').classList.remove('hide');
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('userEmail').textContent = currentUser.email;
            updateStats();
        }

        function loadUser() {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                updateUIAfterLogin();
            }
            loadBookings();
        }

        function logout() {
            currentUser = null;
            localStorage.removeItem('user');
            document.getElementById('headerActions').classList.add('hide');
            showToast('Logout realizado com sucesso!', 'success');
            showSection('home');
        }

        // NAVIGATION
        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');

            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            const navItem = document.querySelector(`[data-section=\"${sectionId}\"]`);
            if (navItem) {
                navItem.classList.add('active');
            }

            if (sectionId === 'services') {
                renderProfessionals();
            } else if (sectionId === 'my-bookings') {
                renderBookings();
            } else if (sectionId === 'profile') {
                updateStats();
            }

            window.scrollTo(0, 0);
        }

        // PROFESSIONALS
        function renderProfessionals() {
            const container = document.getElementById('professionalsList');
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();

            let filtered = professionals.filter(prof => {
                const matchCategory = selectedCategory === 'all' || prof.category === selectedCategory;
                const matchSearch = prof.name.toLowerCase().includes(searchTerm) || 
                                   prof.specialty.toLowerCase().includes(searchTerm);
                return matchCategory && matchSearch;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class=\"empty-state\">
                        <i class=\"fas fa-search\"></i>
                        <h3>Nenhum profissional encontrado</h3>
                        <p>Tente ajustar seus filtros ou busca</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(prof => `
                <div class=\"professional-card\" onclick=\"showProfessionalDetail(${prof.id})\">
                    <img src=\"${prof.image}\" alt=\"${prof.name}\" class=\"professional-img\">
                    <div class=\"professional-info\">
                        <h3>${prof.name}</h3>
                        <div class=\"professional-specialty\">${prof.specialty}</div>
                        <div class=\"professional-rating\">
                            <span class=\"stars\">${renderStars(prof.rating)}</span>
                            <span class=\"rating-text\">${prof.rating} (${prof.reviews} avaliações)</span>
                        </div>
                        <button class=\"btn btn-sm\">
                            <i class=\"fas fa-eye\"></i>
                            Ver Perfil
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function filterByCategory(category) {
            selectedCategory = category;
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('active');
            });
            document.querySelector(`[data-category=\"${category}\"]`).classList.add('active');
            renderProfessionals();
        }

        function filterProfessionals() {
            renderProfessionals();
        }

        function renderStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class=\"fas fa-star\"></i>';
            }
            if (hasHalfStar) {
                stars += '<i class=\"fas fa-star-half-alt\"></i>';
            }
            return stars;
        }

        function showProfessionalDetail(id) {
            const professional = professionals.find(p => p.id === id);
            if (!professional) return;

            currentProfessional = professional;
            const reviews = reviewsData[id] || [];

            const content = `
                <div class=\"profile-header\">
                    <img src=\"${professional.image}\" alt=\"${professional.name}\" class=\"profile-img\">
                    <div class=\"profile-details\">
                        <h2>${professional.name}</h2>
                        <div class=\"profile-specialty\">${professional.specialty}</div>
                        <div class=\"professional-rating\">
                            <span class=\"stars\">${renderStars(professional.rating)}</span>
                            <span class=\"rating-text\">${professional.rating} (${professional.reviews} avaliações)</span>
                        </div>
                        <p style=\"color: var(--text-secondary); margin-top: 1rem;\">
                            <i class=\"fas fa-tag\" style=\"color: var(--primary);\"></i>
                            ${professional.price}
                        </p>
                    </div>
                </div>

                <div class=\"profile-description\">
                    <h3>Sobre o Profissional</h3>
                    <p style=\"color: var(--text-secondary); line-height: 1.8;\">${professional.description}</p>
                </div>

                <div class=\"profile-reviews\">
                    <h3 style=\"margin-bottom: 1.5rem;\">Avaliações dos Pacientes</h3>
                    ${reviews.map(review => `
                        <div class=\"review-item\">
                            <div class=\"review-header\">
                                <span class=\"review-author\">${review.author}</span>
                                <span class=\"stars\">${renderStars(review.rating)}</span>
                            </div>
                            <p class=\"review-text\">${review.text}</p>
                        </div>
                    `).join('')}
                </div>

                <button class=\"btn\" style=\"width: 100%;\" onclick=\"checkAuthAndNavigate('booking')\">
                    <i class=\"fas fa-calendar-check\"></i>
                    Agendar Consulta
                </button>
            `;

            document.getElementById('professionalDetailContent').innerHTML = content;
            showSection('professional-detail');
        }

        function backToProfessionalDetail() {
            if (currentProfessional) {
                showProfessionalDetail(currentProfessional.id);
            } else {
                showSection('services');
            }
        }

        // BOOKING
        function generateTimeSlots() {
            const container = document.getElementById('timeSlots');
            const date = document.getElementById('bookingDate').value;
            
            if (!date) return;

            const slots = [
                '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
                '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
                '16:00', '16:30', '17:00', '17:30', '18:00'
            ];

            container.innerHTML = slots.map(slot => {
                const isBooked = Math.random() > 0.7;
                return `
                    <div class=\"time-slot ${isBooked ? 'unavailable' : ''}\" 
                         onclick=\"${isBooked ? '' : `selectTimeSlot('${slot}')`}\">
                        ${slot}
                    </div>
                `;
            }).join('');

            const professionalInfo = `
                <div style=\"display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 2px solid var(--border);\">
                    <img src=\"${currentProfessional.image}\" alt=\"${currentProfessional.name}\" 
                         style=\"width: 60px; height: 60px; border-radius: 12px; object-fit: cover;\">
                    <div>
                        <h3 style=\"margin-bottom: 0.25rem;\">${currentProfessional.name}</h3>
                        <p style=\"color: var(--primary); font-weight: 600;\">${currentProfessional.specialty}</p>
                    </div>
                </div>
            `;
            document.getElementById('bookingProfessionalInfo').innerHTML = professionalInfo;
        }

        function selectTimeSlot(time) {
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            event.target.classList.add('selected');
            selectedTimeSlot = time;
        }

        function confirmBooking() {
            const date = document.getElementById('bookingDate').value;
            const notes = document.getElementById('bookingNotes').value;

            if (!date) {
                showToast('Por favor, selecione uma data!', 'warning');
                return;
            }

            if (!selectedTimeSlot) {
                showToast('Por favor, selecione um horário!', 'warning');
                return;
            }

            const booking = {
                id: Date.now(),
                professional: currentProfessional,
                date: date,
                time: selectedTimeSlot,
                notes: notes,
                status: 'confirmed',
                createdAt: new Date().toISOString()
            };

            bookings.push(booking);
            saveBookings();

            const confirmationDetails = `
                <p><strong>Profissional:</strong> ${currentProfessional.name}</p>
                <p><strong>Especialidade:</strong> ${currentProfessional.specialty}</p>
                <p><strong>Data:</strong> ${formatDate(date)}</p>
                <p><strong>Horário:</strong> ${selectedTimeSlot}</p>
                ${notes ? `<p><strong>Observações:</strong> ${notes}</p>` : ''}
            `;
            document.getElementById('confirmationDetails').innerHTML = confirmationDetails;

            showToast('Agendamento confirmado!', 'success');
            showSection('booking-confirmation');

            document.getElementById('bookingDate').value = '';
            document.getElementById('bookingNotes').value = '';
            document.getElementById('timeSlots').innerHTML = '';
            selectedTimeSlot = null;
        }

        // MY BOOKINGS
        function renderBookings() {
            const container = document.getElementById('bookingsList');
            
            if (bookings.length === 0) {
                container.innerHTML = `
                    <div class=\"empty-state\">
                        <i class=\"fas fa-calendar-xmark\"></i>
                        <h3>Nenhum agendamento ainda</h3>
                        <p>Que tal fazer seu primeiro agendamento?</p>
                        <button class=\"btn\" onclick=\"showSection('services')\">
                            <i class=\"fas fa-search\"></i>
                            Buscar Profissionais
                        </button>
                    </div>
                `;
                return;
            }

            const sortedBookings = [...bookings].sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            container.innerHTML = sortedBookings.map(booking => `
                <div class=\"booking-card\">
                    <div class=\"booking-info\">
                        <h4>${booking.professional.name}</h4>
                        <p>${booking.professional.specialty}</p>
                        <p><i class=\"fas fa-calendar\"></i> ${formatDate(booking.date)} às ${booking.time}</p>
                    </div>
                    <div style=\"display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-end;\">
                        <span class=\"booking-status ${booking.status}\">
                            ${booking.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                        </span>
                        ${booking.status === 'confirmed' ? `
                            <button class=\"btn btn-danger btn-sm\" onclick=\"cancelBooking(${booking.id})\">
                                <i class=\"fas fa-times\"></i>
                                Cancelar
                            </button>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }

        function cancelBooking(id) {
            if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
                const booking = bookings.find(b => b.id === id);
                if (booking) {
                    booking.status = 'cancelled';
                    saveBookings();
                    renderBookings();
                    updateStats();
                    showToast('Agendamento cancelado!', 'success');
                }
            }
        }

        function saveBookings() {
            if (currentUser) {
                localStorage.setItem(`bookings_${currentUser.email}`, JSON.stringify(bookings));
            }
        }

        function loadBookings() {
            if (currentUser) {
                const saved = localStorage.getItem(`bookings_${currentUser.email}`);
                if (saved) {
                    bookings = JSON.parse(saved);
                }
            }
        }

        // STATS
        function updateStats() {
            const total = bookings.length;
            const completed = bookings.filter(b => b.status === 'confirmed').length;
            const cancelled = bookings.filter(b => b.status === 'cancelled').length;

            document.getElementById('totalBookings').textContent = total;
            document.getElementById('completedBookings').textContent = completed;
            document.getElementById('cancelledBookings').textContent = cancelled;
        }

        // UTILS
        function formatDate(dateString) {
            const date = new Date(dateString + 'T00:00:00');
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }

        function showToast(message, type = 'success') {
            const icons = {
                success: 'fa-circle-check',
                error: 'fa-circle-xmark',
                warning: 'fa-triangle-exclamation'
            };

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <i class=\"fas ${icons[type]}\"></i>
                <span>${message}</span>
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }

        // Close modal when clicking outside
        document.getElementById('authModal').addEventListener('click', (e) => {
            if (e.target.id === 'authModal') {
                hideAuthModal();
            }
        });

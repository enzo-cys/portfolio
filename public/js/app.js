/**
 * Génère le HTML d'une carte projet à partir des données fournies
 */
function createProjectCard(project) {
    return `
    <div class="bg-white rounded-xl shadow-lg overflow-hidden
                hover:shadow-2xl transition-shadow cursor-pointer
                transform hover:-translate-y-1"
                onclick="window.open('${project.link}', '_blank')">
    
        <!-- Image du projet -->
        <img src="${project.image}" alt="${project.title}" 
             class="w-full h-56 object-cover">
    
    <div class="p-6">
        <!-- Titre du projet -->
        <h3 class="text-2xl font-bold mb-3 text-gray-800">
            ${project.title}
        </h3>

        <!-- Description du projet -->
        <p class="text-gray-600 mb-4">
            ${project.description}
        </p>

        <!-- Liste des technologies utilisées -->
        <div class="flex flex-wrap gap-2">
            ${project.technologies.map(tech => `
               <span class="bg-blue-100 text-blue-800 text-sm
                            font-medium px-3 py-1 rounded-full">
                    ${tech}
               </span>
            `).join('')}
        </div>
    </div>
</div>
`;
}
/**
 * récupère la liste des projets depuis l'API
 * et les injecte dans la grille d'affichage
 */
async function loadProjects() {
    try {
        // Appel à l'API pour récupérer les projets
        const response = await fetch("/api/projects");

        // Vérification du statut de la réponse HTTP
        if (!response.ok) throw new Error("Erreur HTTP");
        
        // Conversion de la réponse en JSON
        const projects = await response.json();

        // Sélection du conteneur de la grille
        const grid = document.getElementById("projects-grid");

        // Génération et injection des cartes projets
        grid.innerHTML = projects.map(createProjectCard).join('');
        } catch (error) {
        //gestion et affichage des erreurs
        console.error("Erreur",error);
        }
    }

// Chargement des projets une fois le DOM complétement prêt
document.addEventListener("DOMContentLoaded", loadProjects);

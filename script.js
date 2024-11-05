let csv = "nom;prenom;classe;mediacentre;identifiant;email;participations;derniereParticipationDate;derniereParticipationCampagne;derniereParticipationType;derniereParticipationStatut;certificabilite\n" +
Array.from(document.querySelectorAll('table tbody tr')).map(row => {
    const cells = row.querySelectorAll('td');
    return {
        nom: cells[1].textContent.trim(),
        prenom: cells[2].textContent.trim(),
        classe: cells[4].textContent.trim(),
        connexions: (connexion => ({
            mediacentre: connexion.includes('Médiacentre'),
            identifiant: connexion.includes('Identifiant'),
            email: connexion.includes('Adresse e-mail')
        }))(Array.from(cells[5].querySelectorAll('p')).map(p => p.textContent.trim())),
        participations: cells[6].textContent.trim(),
        derniereParticipation: cells[7].textContent.trim() ? {
            date: cells[7].querySelector(':scope>div>span')?.textContent.trim(),
            campagne: cells[7].querySelectorAll('li')[0]?.querySelector('span')?.textContent?.trim(),
            type: cells[7].querySelectorAll('li')[1]?.querySelector('span')?.textContent.trim(),
            statut: cells[7].querySelectorAll('li')[2]?.querySelector('span')?.textContent.trim()
        } : {
            date: '',
            campagne: '',
            type: '',
            statut: ''
        },
        certificabilite: cells[8].textContent.trim()
    };
}).map(
    student => 
        [
            student.nom,
            student.prenom,
            student.classe,
            student.connexions.mediacentre,
            student.connexions.identifiant,
            student.connexions.email,
            student.participations,
            student.derniereParticipation.date,
            student.derniereParticipation.campagne,
            student.derniereParticipation.type,
            student.derniereParticipation.statut,
            student.certificabilite
        ].join(';')
).join('\n');
// download csv
let a = document.createElement('a');
a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
a.download = 'students.csv';
a.click();

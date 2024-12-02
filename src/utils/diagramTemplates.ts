import { DiagramType } from '../types/diagram';

export const getInitialCode = (type: DiagramType): string => {
  switch (type) {
    case 'sequence':
      return `sequenceDiagram
    Alice->>John: Bonjour John, comment vas-tu?
    John-->>Alice: Très bien, merci!
    Alice->>John: Tu as vu le nouveau film?
    John-->>Alice: Pas encore, il est bien?`;

    case 'flowchart':
      return `flowchart LR
    A[Start] --> B{Condition}
    B -->|Oui| C[Action 1]
    B -->|Non| D[Action 2]
    C --> E[Fin]
    D --> E`;

    case 'classDiagram':
      return `classDiagram
    class Vehicule {
      +String marque
      +String modele
      +demarrer()
      +arreter()
    }
    class Voiture {
      +int nombrePortes
      +accelerer()
    }
    Vehicule <|-- Voiture`;

    case 'c4':
      return `C4Context
    title Système de commerce électronique
    Enterprise_Boundary(b0, "MonEntreprise") {
      Person(customer, "Client", "Utilisateur qui achète des produits")
      System(ecommerce, "E-commerce", "Permet aux clients de voir et acheter des produits")
      System_Ext(payment, "Système de paiement", "Traite les paiements")
    }
    Rel(customer, ecommerce, "Consulte et achète des produits")
    Rel(ecommerce, payment, "Envoie les paiements pour traitement")`;

    case 'gantt':
      return `gantt
    title Planning du Projet
    dateFormat  YYYY-MM-DD
    section Phase 1
    Tâche 1           :a1, 2024-01-01, 30d
    Tâche 2           :after a1, 20d
    section Phase 2
    Tâche 3           :2024-02-15, 12d
    Tâche 4           :24d`;

    default:
      return '';
  }
};
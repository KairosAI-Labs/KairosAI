export enum FAQ_TYPES {
  DEVELOP  = "DEVELOP",
  TECHNICAL_SUPPORT = "TECHNICAL SUPPORT",
  MANAGED_SERVICE = "MANAGED SERVICE"
}

export const MENU_FAQ_TYPES = [
  {
    name: "Desarrollos",
    type: FAQ_TYPES.DEVELOP
  },
  {
    name: "Soporte",
    type: FAQ_TYPES.TECHNICAL_SUPPORT
  },
  {
    name: "IA y Automatización",
    type: FAQ_TYPES.MANAGED_SERVICE
  }
]

export interface FAQType{
  question: string
  answer: string
  type: FAQ_TYPES
}

export const FAQ = [
    {
      question: "¿Qué tipo de software o aplicaciones desarrollan?",
      answer: "Desarrollamos software a la medida que incluye aplicaciones web, apps móviles, sistemas internos y soluciones especializadas.",
      type: FAQ_TYPES.DEVELOP
      
    },
    {
      question: "¿Cuánto tiempo tarda un proyecto típico?",
      answer: "Depende de la complejidad, pero la mayoría de los proyectos van de 3 a 6 meses. Proporcionamos un cronograma claro en la propuesta.",
      type: FAQ_TYPES.DEVELOP
      
    },
    {
      question: "¿Quién es el dueño final del producto?",
      answer: "Usted es el dueño de la aplicación y de todos los datos. Nosotros conservamos la propiedad intelectual del código base, otorgándole una licencia de uso exclusiva.",
      type: FAQ_TYPES.DEVELOP
      
    },
    {
      question: "¿Tengo que proporcionar el diseño (UI/UX)?",
      answer: "No es necesario. Nuestro servicio incluye el diseño profesional de interfaz y experiencia de usuario, asegurando un sistema usable y atractivo.",
      type: FAQ_TYPES.DEVELOP
      
    },
    {
      question: "¿Pueden integrar el sistema con mi software actual?",
      answer: "Sí, la integración con sistemas de terceros, bases de datos o software de gestión existente (CRM, ERP) es una parte clave de nuestro servicio.",
      type: FAQ_TYPES.DEVELOP
      
    },
    {
      question: "¿Qué sucede después de lanzar el proyecto?",
      answer: "Ofrecemos un periodo de garantía por errores y planes de mantenimiento continuo para asegurar que el sistema siga funcionando perfectamente.",
      type: FAQ_TYPES.TECHNICAL_SUPPORT
    },
    {
      question: "¿Ofrecen servicios de hosting y servidores?",
      answer: "Sí. Gestionamos el mantenimiento de servidores con monitoreo 24/7, copias de seguridad automáticas y optimización de rendimiento.",
      type: FAQ_TYPES.TECHNICAL_SUPPORT
    },
    {
      question: "¿Qué incluye el servicio de mantenimiento?",
      answer: "Incluye actualizaciones de seguridad, corrección de bugs, mejoras de rendimiento y soporte técnico para mantener su sistema actualizado.",
      type: FAQ_TYPES.TECHNICAL_SUPPORT
    },
    {
      question: "¿Cómo manejan las fallas o errores críticos?",
      answer: "Contamos con un equipo de soporte con tiempo de respuesta prioritario para resolver fallas críticas y minimizar el tiempo de inactividad.",
      type: FAQ_TYPES.TECHNICAL_SUPPORT
    },
    {
      question: "¿Es necesario contratar mantenimiento mensual?",
      answer: "Sí, es esencial para garantizar la seguridad, el rendimiento y la compatibilidad de su software frente a nuevas actualizaciones tecnológicas.",
      type: FAQ_TYPES.TECHNICAL_SUPPORT
    },
  
    {
      question: "¿Cómo funciona la IA como servicio?",
      answer: "Nosotros gestionamos la infraestructura de IA en nuestros servidores. Usted paga una cuota recurrente por el uso, mantenimiento y optimización de la solución.",
      type: FAQ_TYPES.MANAGED_SERVICE
    },
    {
      question: "¿Qué problemas resuelve la automatización con IA?",
      answer: "Ayuda a automatizar tareas repetitivas, procesar grandes volúmenes de datos y reducir costos operativos significativamente.",
      type: FAQ_TYPES.MANAGED_SERVICE
    },
    {
      question: "¿Debo pagar por el código de la automatización?",
      answer: "No. En servicios gestionados, usted paga por el acceso y el rendimiento de la solución, eliminando los altos costos de adquisición de código.",
      type: FAQ_TYPES.MANAGED_SERVICE
    },
    {
      question: "¿Qué datos requieren para implementar la IA?",
      answer: "Necesitamos acceso seguro a los datos históricos y operativos relevantes para personalizar los modelos de IA según sus necesidades específicas.",
      type: FAQ_TYPES.MANAGED_SERVICE
    },
    {
      question: "¿Qué pasa si mis necesidades de negocio cambian?",
      answer: "Nuestro servicio es flexible. Ajustamos continuamente los modelos y procesos de IA para alinearlos con la evolución y el crecimiento de su empresa.",
      type: FAQ_TYPES.MANAGED_SERVICE
    }

]
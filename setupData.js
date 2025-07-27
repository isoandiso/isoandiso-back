// Inserción de isos
const result = db.isos.insertMany([
  { name: 'ISO 9001-2015' }, { name: 'ISO 45001-2018' }, { name: 'ISO 14001-2018' },
  { name: 'ISO 27001-2022' }, { name: 'ISO 19601-2017' }, { name: 'ISO 20121-2024' },
  { name: 'ISO 30301-2019' }, { name: 'ISO 39001-2018' }, { name: 'ISO 13485-2018' },
  { name: 'ISO 22001-2018' }, { name: 'ISO 50001-2018' }, { name: 'ISO 21001-2018' },
  { name: 'ISO 28001-2018' }, { name: 'ISO 37001-2018' }, { name: 'ISO 17020-2018 EMA' },
  { name: 'ISO 29001-2020' }, { name: 'ISO 26001-2019' }, { name: 'ISO 15189-2023' },
  { name: 'ISO 27701-2019' }, { name: 'ISO 16949-2016' }, { name: 'ISO 17025-2017' },
  { name: 'ISO 22716-2008' }, { name: 'ISO 22301-2019' }, { name: 'ISO 24001-2015' },
  { name: 'ISO 17021-2015' }, { name: 'RRHH' }
]);

const iso9001Id = result.insertedIds[0];
const iso45001Id = result.insertedIds[1];
const rrhhId = result.insertedIds[25];

// Inserción de paises
db.companycountries.insertMany([
  { name: 'España' }, { name: 'México' }, { name: 'Guatemala' }, { name: 'El Salvador' },
  { name: 'Honduras' }, { name: 'Nicaragua' }, { name: 'Costa Rica' }, { name: 'Panamá' },
  { name: 'Colombia' }, { name: 'Ecuador' }, { name: 'Perú' }, { name: 'Bolivia' },
  { name: 'Chile' }, { name: 'Argentina' }, { name: 'Uruguay' }, { name: 'Paraguay' },
  { name: 'Venezuela' }, { name: 'Puerto Rico' }, { name: 'República Dominicana' },
  { name: 'Cuba' }, { name: 'Guinea Ecuatorial' }
]);

// (agregamos las isos 9001,45000 y rrhh a los paises México, Perú y Chile)
db.companycountries.updateMany(
  { name: { $in: ["México", "Perú", "Chile"] } },
  { $set: { isoIds: [iso9001Id, iso45001Id, rrhhId] } }
);

// Inserción de tipos de adquisiciones
db.companyacquisitiontypes.insertMany([
  { name: 'Gratuito' }, { name: 'Alquiler mensual' }, { name: 'Alquiler anual' }, { name: 'Compra' }
]);

// Inserción de roles
db.rols.insertMany([
  { name: 'Jefe' }, { name: 'Asistente' }, { name: 'Colaborador' }
]);

// Inserción de nacionalidades
db.employeenationalities.insertMany([
  { name: "Afgana" }, { name: "Albanesa" }, { name: "Alemana" }, { name: "Andorrana" },
  { name: "Angoleña" }, { name: "Antiguana y barbudense" }, { name: "Saudí" },
  { name: "Argelina" }, { name: "Argentina" }, { name: "Armenia" }, { name: "Australiana" },
  { name: "Austríaca" }, { name: "Bangladesí" }, { name: "Barbadense" }, { name: "Belga" },
  { name: "Beliceña" }, { name: "Beninesa" }, { name: "Bielorrusa" }, { name: "Birmana" },
  { name: "Boliviana" }, { name: "Bosnia" }, { name: "Botsuana" }, { name: "Brasileña" },
  { name: "Británica" }, { name: "Bruneana" }, { name: "Búlgara" }, { name: "Burkinesa" },
  { name: "Burundesa" }, { name: "Butanesa" }, { name: "Cabo-verdiana" }, { name: "Camboyana" },
  { name: "Camerunesa" }, { name: "Canadiense" }, { name: "Catarí" }, { name: "Chadiana" },
  { name: "Checa" }, { name: "Chilena" }, { name: "China" }, { name: "Chipriota" },
  { name: "Colombiana" }, { name: "Comorana" }, { name: "Congoleña" }, { name: "Costarricense" },
  { name: "Croata" }, { name: "Cubana" }, { name: "Danesa" }, { name: "Dominicana" },
  { name: "Ecuatoriana" }, { name: "Egipcia" }, { name: "Salvadoreña" }, { name: "Emiratí" },
  { name: "Eslovaca" }, { name: "Eslovena" }, { name: "Española" }, { name: "Estadounidense" },
  { name: "Estonia" }, { name: "Etíope" }, { name: "Filipina" }, { name: "Finlandesa" },
  { name: "Francesa" }, { name: "Gabonense" }, { name: "Galesa" }, { name: "Ghanesa" },
  { name: "Griega" }, { name: "Guatemalteca" }, { name: "Guineana" }, { name: "Haitiana" },
  { name: "Hondureña" }, { name: "Húngara" }, { name: "India" }, { name: "Indonesa" },
  { name: "Irakí" }, { name: "Iraní" }, { name: "Irlandesa" }, { name: "Islandesa" },
  { name: "Israelí" }, { name: "Italiana" }, { name: "Jamaiquina" }, { name: "Japonesa" },
  { name: "Jordana" }, { name: "Keniana" }, { name: "Kirguís" }, { name: "Laosiana" },
  { name: "Letona" }, { name: "Libanesa" }, { name: "Liberiana" }, { name: "Libia" },
  { name: "Liechtensteiniana" }, { name: "Lituana" }, { name: "Luxemburguesa" }, { name: "Malgache" },
  { name: "Malaya" }, { name: "Maliense" }, { name: "Maltesa" }, { name: "Marfileña" },
  { name: "Marroquí" }, { name: "Mauritana" }, { name: "Mexicana" }, { name: "Moldava" },
  { name: "Monegasca" }, { name: "Mongola" }, { name: "Montenegrina" }, { name: "Mozambiqueña" },
  { name: "Namibia" }, { name: "Nepalesa" }, { name: "Nicaragüense" }, { name: "Nigeriana" },
  { name: "Norcoreana" }, { name: "Noruega" }, { name: "Neozelandesa" }, { name: "Omana" },
  { name: "Paquistaní" }, { name: "Panameña" }, { name: "Paraguaya" }, { name: "Peruana" },
  { name: "Polaca" }, { name: "Portuguesa" }, { name: "Puertorriqueña" }, { name: "Rumana" },
  { name: "Rusa" }, { name: "Saharaui" }, { name: "Salomonense" }, { name: "Samoana" },
  { name: "Senegalesa" }, { name: "Serbia" }, { name: "Singapurense" }, { name: "Somalí" },
  { name: "Sudafricana" }, { name: "Sudanesa" }, { name: "Sueca" }, { name: "Suiza" },
  { name: "Surcoreana" }, { name: "Surinamense" }, { name: "Tailandesa" }, { name: "Tanzana" },
  { name: "Togolesa" }, { name: "Trinitense" }, { name: "Tunecina" }, { name: "Turca" },
  { name: "Ucraniana" }, { name: "Ugandesa" }, { name: "Uruguaya" }, { name: "Uzbeca" },
  { name: "Venezolana" }, { name: "Vietnamita" }, { name: "Yemení" }, { name: "Zambiana" },
  { name: "Zimbabuense" }
]);

// Inserción de una subempresa
db.subcompanies.insertOne({
  ruc: "555555555",
  socialReason: "Nueva Empresa",
  economicActivity: "Tecnología",
  economicSector: "Servicios",
  companySize: "Grande",
  entryDate: new Date("2022-01-01"),
  contractTerminationDate: new Date("2025-01-01")
});


//////////////////


// Inserción de General Objectives
const generalObjectiveResult = db.generalobjectives.insertMany([
  { description: 'Mantener y evidenciar el Liderazgo y Compromiso de la Alta Gerencia y toda su línea de mando con el Sistema de Gestión de Seguridad del Proyecto' },
  { description: 'Prevenir los accidentes laborales de nuestros colaboradores, aplicando la mejora contínua en temas de Seguridad' },
  { description: 'Capacitar al personal en temas de seguridad de acuerdo a su puesto de trabajo' },
  { description: 'Asegurar que todas las medidas correctivas de los incidentes y accidentes sean corregidas' },
  { description: 'Verificar la implementación del Sistema de Gestión de Seguridad mediante auditorías' },
  { description: 'Mantener al personal preparado para caso de emergencia' },
  { description: 'Identificar y corregir actos y condiciones inseguras en los frentes de trabajo del proyecto' }
]);

const go1Id = generalObjectiveResult.insertedIds[0];
const go2Id = generalObjectiveResult.insertedIds[1];
const go3Id = generalObjectiveResult.insertedIds[2];
const go4Id = generalObjectiveResult.insertedIds[3];
const go5Id = generalObjectiveResult.insertedIds[4];
const go6Id = generalObjectiveResult.insertedIds[5];
const go7Id = generalObjectiveResult.insertedIds[6];

// Inserción de Specific Objectives
const specificObjectiveResult = db.specificobjectives.insertMany([
  { description: 'N/A', generalObjectiveId: go1Id },
  { description: 'N/A', generalObjectiveId: go2Id },
  { description: 'N/A', generalObjectiveId: go3Id },
  { description: 'N/A', generalObjectiveId: go4Id },
  { description: 'N/A', generalObjectiveId: go5Id },
  { description: 'N/A', generalObjectiveId: go6Id },
  { description: 'N/A', generalObjectiveId: go7Id }
]);

const so1Id = specificObjectiveResult.insertedIds[0];
const so2Id = specificObjectiveResult.insertedIds[1];
const so3Id = specificObjectiveResult.insertedIds[2];
const so4Id = specificObjectiveResult.insertedIds[3];
const so5Id = specificObjectiveResult.insertedIds[4];
const so6Id = specificObjectiveResult.insertedIds[5];
const so7Id = specificObjectiveResult.insertedIds[6];

// Inserción de Management Tools
const managementToolResult = db.managementtools.insertMany([
  { description: 'LIDERAZGO', specificObjectiveId: so1Id },
  { description: 'COMITÉ DE SEGURIDAD', specificObjectiveId: so1Id },
  { description: 'INSPECCIONES (ÁREAS DE TRABAJO)', specificObjectiveId: so2Id },
  { description: 'INSPECCIONES (VEHÍCULOS Y EQUIPOS)', specificObjectiveId: so2Id },
  { description: 'INSPECCIONES DE SISTEMA ELÉCTRICO Y EQUIPOS', specificObjectiveId: so2Id },
  { description: 'INSPECCIONES (HERRAMIENTAS / EPPs)', specificObjectiveId: so2Id },
  { description: 'INSPECCIONES (ELEMENTOS DE EMERGENCIA)', specificObjectiveId: so2Id },
  { description: 'MONITOREOS', specificObjectiveId: so2Id },
  { description: 'CAPACITACIÓN', specificObjectiveId: so3Id },
  { description: 'INVESTIGACIÓN DE ACCIDENTES, INCIDENTES', specificObjectiveId: so4Id },
  { description: 'REQUISITOS LEGALES', specificObjectiveId: so5Id },
  { description: 'AUDITORÍAS DEL SGSST', specificObjectiveId: so5Id },
  { description: 'GESTIÓN DE CONTRATISTAS', specificObjectiveId: so5Id },
  { description: 'PLAN DE EMERGENCIA', specificObjectiveId: so6Id },
  { description: 'IPERC Y GESTIÓN DE RIESGOS', specificObjectiveId: so7Id },
  { description: 'PROCEDIMIENTOS DE TRABAJO', specificObjectiveId: so7Id }
]);

const mt1_1Id = managementToolResult.insertedIds[0];
const mt1_2Id = managementToolResult.insertedIds[1];
const mt2_3Id = managementToolResult.insertedIds[2];
const mt2_4Id = managementToolResult.insertedIds[3];
const mt2_5Id = managementToolResult.insertedIds[4];
const mt2_6Id = managementToolResult.insertedIds[5];
const mt2_7Id = managementToolResult.insertedIds[6];
const mt2_8Id = managementToolResult.insertedIds[7];
const mt3_9Id = managementToolResult.insertedIds[8];
const mt4_10Id = managementToolResult.insertedIds[9];
const mt5_11Id = managementToolResult.insertedIds[10];
const mt5_12Id = managementToolResult.insertedIds[11];
const mt5_13Id = managementToolResult.insertedIds[12];
const mt6_14Id = managementToolResult.insertedIds[13];
const mt7_15Id = managementToolResult.insertedIds[14];
const mt7_16Id = managementToolResult.insertedIds[15];

// Inserción de Activities
db.activities.insertMany([
  { description: 'Revisar las políticas en materia de Seguridad', managementToolId: mt1_1Id },
  { description: 'Difundir la polìtica de Alcohol y drogas', managementToolId: mt1_1Id },
  { description: 'Difundir la polìtica de Tolerancia cero', managementToolId: mt1_1Id },
  { description: 'Publicar las Políticas en los frentes de trabajo', managementToolId: mt1_1Id },
  { description: 'Implementar y Desarrollar el Programa Mensual de Liderazgo visible / Desempeño de la Línea de mando en Seguridad', managementToolId: mt1_1Id },
  { description: 'Conformación del Comité SST', managementToolId: mt1_2Id },
  { description: 'Realizar las elecciones del Comité SST', managementToolId: mt1_2Id },
  { description: 'Realizar las Reuniones ordinarias del Comité SST', managementToolId: mt1_2Id },
  { description: 'Realizar Inspección mensual por el Comité de Seguridad', managementToolId: mt1_2Id },
  { description: 'Capacitar a los miembros del Comité de Seguridad', managementToolId: mt1_2Id },
  { description: 'Realizar los Reportes trimestrales del Comité de Seguridad y Salud ocupacional', managementToolId: mt1_2Id },
  { description: 'Realizar el Informe Anual de las Actividades del Comité SST', managementToolId: mt1_2Id },
  { description: 'Caminata Gerencial', managementToolId: mt2_3Id },
  { description: 'Inspecciones de frentes de trabajo (Superficie y subterráneeo)', managementToolId: mt2_3Id },
  { description: 'Inspección de talleres (mantenimiento, soldadura, etc)', managementToolId: mt2_3Id },
  { description: 'Inspección de campamentos', managementToolId: mt2_3Id },
  { description: 'Inspección de polvorín de explosivos', managementToolId: mt2_3Id },
  { description: 'Inspección de almacenes', managementToolId: mt2_3Id },
  { description: 'Inspección de oficinas', managementToolId: mt2_3Id },
  { description: 'Inspección General de Vehiculos y equipos', managementToolId: mt2_4Id },
  { description: 'Inspección de grúas', managementToolId: mt2_4Id },
  { description: 'Inspección de cisterna de combustible', managementToolId: mt2_4Id },
  { description: 'Grupo eléctrogeno / Generador eléctrico', managementToolId: mt2_5Id },
  { description: 'Luminarias / Torres de iluminaMonitoreo de Control de Gasesción', managementToolId: mt2_5Id },
  { description: 'Inspección de tableros Eléctricos e Instalaciones eléctricas.', managementToolId: mt2_5Id },
  { description: 'Inspección de Herramientas  Manuales y eléctricas', managementToolId: mt2_6Id },
  { description: 'Inspección de Escaleras Pórtatiles', managementToolId: mt2_6Id },
  { description: 'Inspección de Bombas sumergibles', managementToolId: mt2_6Id },
  { description: 'Inspección de andamios', managementToolId: mt2_6Id },
  { description: 'Inspección de EPPs', managementToolId: mt2_6Id },
  { description: 'Inspección de arnés y línea de vida', managementToolId: mt2_6Id },
  { description: 'Inspección de Sistema de Izaje - Dispositivos de Izaje - Cables de Izaje', managementToolId: mt2_6Id },
  { description: 'Inspección de Extintores', managementToolId: mt2_7Id },
  { description: 'Inspección de Sistemas de Protección contra incendios', managementToolId: mt2_7Id },
  { description: 'Monitoreo de velocidad de vehiculos', managementToolId: mt2_8Id },
  { description: 'Monitoreo de Control de Iluminación', managementToolId: mt2_8Id },
  { description: 'Monitoreo de Control de Gases', managementToolId: mt2_8Id },
  { description: 'Monitoreo de Control de Gases de vehículos y equipos que ingresan a labores subterráneas', managementToolId: mt2_8Id },
  { description: 'Monitoreo de velocidad de viento en labores subterráneas', managementToolId: mt2_8Id },
  { description: 'Elaborar y aprobar el programa de Capacitación por puesto de trabajo', managementToolId: mt3_9Id },
  { description: 'Cumplir con el programa de Capacitación por puesto de trabajo', managementToolId: mt3_9Id },
  { description: 'Desarrollar las charlas integrales', managementToolId: mt3_9Id },
  { description: 'Realizar campañas de sensibilización y concientización', managementToolId: mt3_9Id },
  { description: 'Cumplir con el levantamiento de acciones correctivas de los incidentes', managementToolId: mt4_10Id },
  { description: 'Cumplir con el levantamiento de acciones correctivas de los accidentes', managementToolId: mt4_10Id },
  { description: 'Difundir las Lecciones aprendidas de los incidentes', managementToolId: mt4_10Id },
  { description: 'Realizar la identificación de los Requisitos legales en materia de Seguridad', managementToolId: mt5_11Id },
  { description: 'Realizar la evaluación de cumplimiento de requisitos legales en materia de seguridad', managementToolId: mt5_11Id },
  { description: 'Realizar auditoría interna del Sistema de Gestión de Seguridad', managementToolId: mt5_12Id },
  { description: 'Realizar auditorías al Sistema de Gestión de Seguridad y Salud ocupacional (De acuerdo al D.S. N°014-2013-TR)', managementToolId: mt5_12Id },
  { description: 'Realizar auditorías a nuestras contratistas permanentes de acuerdo al Programa de auditorías', managementToolId: mt5_13Id },
  { description: 'Realizar inspecciones a las contratistas', managementToolId: mt5_13Id },
  { description: 'Actualizar el Plan de Respuesta a emergencias del proyecto', managementToolId: mt6_14Id },
  { description: 'Conformar e identificar las Brigadas de primera Respuesta del proyecto', managementToolId: mt6_14Id },
  { description: 'Ejecutar el programa Anual de simulacros (Revisar Plan de Contingencia y Respuesta a emergencia)', managementToolId: mt6_14Id },
  { description: 'Cumplir con el programa de Capacitación a la Brigada de emergencia', managementToolId: mt6_14Id },
  { description: 'Actualizar los Mapas de Proceso', managementToolId: mt7_15Id },
  { description: 'Revisión de la Matriz de Identificación de Peligros, Evaluación de Riesgos y Medidas de Control (IPERC Base)', managementToolId: mt7_15Id },
  { description: 'Difundir las Matrices IPERC que se implementan o actualizan', managementToolId: mt7_15Id },
  { description: 'Revisión de los Mapas de Riesgos de los frentes de trabajo', managementToolId: mt7_15Id },
  { description: 'Verificar los controles de los riesgos críticos en los frentes de trabajo', managementToolId: mt7_15Id },
  { description: 'Actualizar los Estándares de Seguridad', managementToolId: mt7_16Id },
  { description: 'Actualizar los PETS que tengan más de un año de vigencia', managementToolId: mt7_16Id },
  { description: 'Revisar los PETS mediante Observaciones Planeadas de Tarea (OPT)', managementToolId: mt7_16Id },
  { description: 'Implementar los PETS para todas las tareas de alto riesgo', managementToolId: mt7_16Id },
  { description: 'Difundir los PETS de las actividades', managementToolId: mt7_16Id }
]);
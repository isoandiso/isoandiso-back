-- 1. Inserción de ISOs
INSERT INTO iso (name, created_at, updated_at) VALUES
  ('ISO 9001-2015', NOW(), NOW()), ('ISO 45001-2018', NOW(), NOW()), ('ISO 14001-2018', NOW(), NOW()),
  ('ISO 27001-2022', NOW(), NOW()), ('ISO 19601-2017', NOW(), NOW()), ('ISO 20121-2024', NOW(), NOW()),
  ('ISO 30301-2019', NOW(), NOW()), ('ISO 39001-2018', NOW(), NOW()), ('ISO 13485-2018', NOW(), NOW()),
  ('ISO 22001-2018', NOW(), NOW()), ('ISO 50001-2018', NOW(), NOW()), ('ISO 21001-2018', NOW(), NOW()),
  ('ISO 28001-2018', NOW(), NOW()), ('ISO 37001-2018', NOW(), NOW()), ('ISO 17020-2018 EMA', NOW(), NOW()),
  ('ISO 29001-2020', NOW(), NOW()), ('ISO 26001-2019', NOW(), NOW()), ('ISO 15189-2023', NOW(), NOW()),
  ('ISO 27701-2019', NOW(), NOW()), ('ISO 16949-2016', NOW(), NOW()), ('ISO 17025-2017', NOW(), NOW()),
  ('ISO 22716-2008', NOW(), NOW()), ('ISO 22301-2019', NOW(), NOW()), ('ISO 24001-2015', NOW(), NOW()),
  ('ISO 17021-2015', NOW(), NOW()), ('RRHH', NOW(), NOW());

-- 2. Inserción de países
INSERT INTO company_country (name, created_at, updated_at) VALUES
  ('España', NOW(), NOW()), ('México', NOW(), NOW()), ('Guatemala', NOW(), NOW()), ('El Salvador', NOW(), NOW()),
  ('Honduras', NOW(), NOW()), ('Nicaragua', NOW(), NOW()), ('Costa Rica', NOW(), NOW()), ('Panamá', NOW(), NOW()),
  ('Colombia', NOW(), NOW()), ('Ecuador', NOW(), NOW()), ('Perú', NOW(), NOW()), ('Bolivia', NOW(), NOW()),
  ('Chile', NOW(), NOW()), ('Argentina', NOW(), NOW()), ('Uruguay', NOW(), NOW()), ('Paraguay', NOW(), NOW()),
  ('Venezuela', NOW(), NOW()), ('Puerto Rico', NOW(), NOW()), ('República Dominicana', NOW(), NOW()),
  ('Cuba', NOW(), NOW()), ('Guinea Ecuatorial', NOW(), NOW());


-- 3. Relacionar ISOs 9001, 45001 y RRHH con México, Perú y Chile
-- Primero, obtén los IDs de las ISOs y los países:
-- SELECT id, name FROM iso WHERE name IN ('ISO 9001-2015', 'ISO 45001-2018', 'RRHH');
-- SELECT id, name FROM company_country WHERE name IN ('México', 'Perú', 'Chile');
-- Supón que los IDs de las ISOs son: 1 (9001), 2 (45001), 26 (RRHH)
-- Supón que los IDs de los países son: 2 (México), 11 (Perú), 13 (Chile)
INSERT INTO company_country_iso (company_country_id, iso_id, created_at, updated_at) VALUES
  (2, 1, NOW(), NOW()), (2, 2, NOW(), NOW()), (2, 26, NOW(), NOW()),
  (11, 1, NOW(), NOW()), (11, 2, NOW(), NOW()), (11, 26, NOW(), NOW()),
  (13, 1, NOW(), NOW()), (13, 2, NOW(), NOW()), (13, 26, NOW(), NOW());

-- 4. Inserción de tipos de adquisiciones
INSERT INTO company_acquisition_type (name, created_at, updated_at) VALUES
  ('Gratuito', NOW(), NOW()),
  ('Alquiler mensual', NOW(), NOW()),
  ('Alquiler anual', NOW(), NOW()),
  ('Compra', NOW(), NOW());

-- 5. Inserción de roles
INSERT INTO rol (name, created_at, updated_at) VALUES
  ('Jefe', NOW(), NOW()),
  ('Asistente', NOW(), NOW()),
  ('Supervisor', NOW(), NOW()),
  ('Colaborador', NOW(), NOW());

-- 6. Inserción de nacionalidades
INSERT INTO employee_nationality (name, created_at, updated_at) VALUES
  ('Afgana', NOW(), NOW()), ('Albanesa', NOW(), NOW()), ('Alemana', NOW(), NOW()), ('Andorrana', NOW(), NOW()),
  ('Angoleña', NOW(), NOW()), ('Antiguana y barbudense', NOW(), NOW()), ('Saudí', NOW(), NOW()),
  ('Argelina', NOW(), NOW()), ('Argentina', NOW(), NOW()), ('Armenia', NOW(), NOW()), ('Australiana', NOW(), NOW()),
  ('Austríaca', NOW(), NOW()), ('Bangladesí', NOW(), NOW()), ('Barbadense', NOW(), NOW()), ('Belga', NOW(), NOW()),
  ('Beliceña', NOW(), NOW()), ('Beninesa', NOW(), NOW()), ('Bielorrusa', NOW(), NOW()), ('Birmana', NOW(), NOW()),
  ('Boliviana', NOW(), NOW()), ('Bosnia', NOW(), NOW()), ('Botsuana', NOW(), NOW()), ('Brasileña', NOW(), NOW()),
  ('Británica', NOW(), NOW()), ('Bruneana', NOW(), NOW()), ('Búlgara', NOW(), NOW()), ('Burkinesa', NOW(), NOW()),
  ('Burundesa', NOW(), NOW()), ('Butanesa', NOW(), NOW()), ('Cabo-verdiana', NOW(), NOW()), ('Camboyana', NOW(), NOW()),
  ('Camerunesa', NOW(), NOW()), ('Canadiense', NOW(), NOW()), ('Catarí', NOW(), NOW()), ('Chadiana', NOW(), NOW()),
  ('Checa', NOW(), NOW()), ('Chilena', NOW(), NOW()), ('China', NOW(), NOW()), ('Chipriota', NOW(), NOW()),
  ('Colombiana', NOW(), NOW()), ('Comorana', NOW(), NOW()), ('Congoleña', NOW(), NOW()), ('Costarricense', NOW(), NOW()),
  ('Croata', NOW(), NOW()), ('Cubana', NOW(), NOW()), ('Danesa', NOW(), NOW()), ('Dominicana', NOW(), NOW()),
  ('Ecuatoriana', NOW(), NOW()), ('Egipcia', NOW(), NOW()), ('Salvadoreña', NOW(), NOW()), ('Emiratí', NOW(), NOW()),
  ('Eslovaca', NOW(), NOW()), ('Eslovena', NOW(), NOW()), ('Española', NOW(), NOW()), ('Estadounidense', NOW(), NOW()),
  ('Estonia', NOW(), NOW()), ('Etíope', NOW(), NOW()), ('Filipina', NOW(), NOW()), ('Finlandesa', NOW(), NOW()),
  ('Francesa', NOW(), NOW()), ('Gabonense', NOW(), NOW()), ('Galesa', NOW(), NOW()), ('Ghanesa', NOW(), NOW()),
  ('Griega', NOW(), NOW()), ('Guatemalteca', NOW(), NOW()), ('Guineana', NOW(), NOW()), ('Haitiana', NOW(), NOW()),
  ('Hondureña', NOW(), NOW()), ('Húngara', NOW(), NOW()), ('India', NOW(), NOW()), ('Indonesa', NOW(), NOW()),
  ('Irakí', NOW(), NOW()), ('Iraní', NOW(), NOW()), ('Irlandesa', NOW(), NOW()), ('Islandesa', NOW(), NOW()),
  ('Israelí', NOW(), NOW()), ('Italiana', NOW(), NOW()), ('Jamaiquina', NOW(), NOW()), ('Japonesa', NOW(), NOW()),
  ('Jordana', NOW(), NOW()), ('Keniana', NOW(), NOW()), ('Kirguís', NOW(), NOW()), ('Laosiana', NOW(), NOW()),
  ('Letona', NOW(), NOW()), ('Libanesa', NOW(), NOW()), ('Liberiana', NOW(), NOW()), ('Libia', NOW(), NOW()),
  ('Liechtensteiniana', NOW(), NOW()), ('Lituana', NOW(), NOW()), ('Luxemburguesa', NOW(), NOW()), ('Malgache', NOW(), NOW()),
  ('Malaya', NOW(), NOW()), ('Maliense', NOW(), NOW()), ('Maltesa', NOW(), NOW()), ('Marfileña', NOW(), NOW()),
  ('Marroquí', NOW(), NOW()), ('Mauritana', NOW(), NOW()), ('Mexicana', NOW(), NOW()), ('Moldava', NOW(), NOW()),
  ('Monegasca', NOW(), NOW()), ('Mongola', NOW(), NOW()), ('Montenegrina', NOW(), NOW()), ('Mozambiqueña', NOW(), NOW()),
  ('Namibia', NOW(), NOW()), ('Nepalesa', NOW(), NOW()), ('Nicaragüense', NOW(), NOW()), ('Nigeriana', NOW(), NOW()),
  ('Norcoreana', NOW(), NOW()), ('Noruega', NOW(), NOW()), ('Neozelandesa', NOW(), NOW()), ('Omana', NOW(), NOW()),
  ('Paquistaní', NOW(), NOW()), ('Panameña', NOW(), NOW()), ('Paraguaya', NOW(), NOW()), ('Peruana', NOW(), NOW()),
  ('Polaca', NOW(), NOW()), ('Portuguesa', NOW(), NOW()), ('Puertorriqueña', NOW(), NOW()), ('Rumana', NOW(), NOW()),
  ('Rusa', NOW(), NOW()), ('Saharaui', NOW(), NOW()), ('Salomonense', NOW(), NOW()), ('Samoana', NOW(), NOW()),
  ('Senegalesa', NOW(), NOW()), ('Serbia', NOW(), NOW()), ('Singapurense', NOW(), NOW()), ('Somalí', NOW(), NOW()),
  ('Sudafricana', NOW(), NOW()), ('Sudanesa', NOW(), NOW()), ('Sueca', NOW(), NOW()), ('Suiza', NOW(), NOW()),
  ('Surcoreana', NOW(), NOW()), ('Surinamense', NOW(), NOW()), ('Tailandesa', NOW(), NOW()), ('Tanzana', NOW(), NOW()),
  ('Togolesa', NOW(), NOW()), ('Trinitense', NOW(), NOW()), ('Tunecina', NOW(), NOW()), ('Turca', NOW(), NOW()),
  ('Ucraniana', NOW(), NOW()), ('Ugandesa', NOW(), NOW()), ('Uruguaya', NOW(), NOW()), ('Uzbeca', NOW(), NOW()),
  ('Venezolana', NOW(), NOW()), ('Vietnamita', NOW(), NOW()), ('Yemení', NOW(), NOW()), ('Zambiana', NOW(), NOW()),
  ('Zimbabuense', NOW(), NOW());

-- 7. Inserción de una subempresa
INSERT INTO subcompany (ruc, social_reason, economic_activity, economic_sector, company_size, entry_date, contract_termination_date, created_at, updated_at)
VALUES ('555555555', 'Nueva Empresa', 'Tecnología', 'Servicios', 'Grande', '2022-01-01', '2025-01-01', NOW(), NOW());

-- 8. Inserción de General Objectives
INSERT INTO general_objective (description, created_at, updated_at) VALUES
  ('Mantener y evidenciar el Liderazgo y Compromiso de la Alta Gerencia y toda su línea de mando con el Sistema de Gestión de Seguridad del Proyecto', NOW(), NOW()),
  ('Prevenir los accidentes laborales de nuestros colaboradores, aplicando la mejora contínua en temas de Seguridad', NOW(), NOW()),
  ('Capacitar al personal en temas de seguridad de acuerdo a su puesto de trabajo', NOW(), NOW()),
  ('Asegurar que todas las medidas correctivas de los incidentes y accidentes sean corregidas', NOW(), NOW()),
  ('Verificar la implementación del Sistema de Gestión de Seguridad mediante auditorías', NOW(), NOW()),
  ('Mantener al personal preparado para caso de emergencia', NOW(), NOW()),
  ('Identificar y corregir actos y condiciones inseguras en los frentes de trabajo del proyecto', NOW(), NOW());

-- 9. Inserción de Specific Objectives
-- Primero, obtén los IDs de los general objectives:
-- SELECT id FROM general_objective;
-- Supón que los IDs son 1, 2, 3, 4, 5, 6, 7:
INSERT INTO specific_objective (description, general_objective_id, created_at, updated_at) VALUES
  ('N/A', 1, NOW(), NOW()),
  ('N/A', 2, NOW(), NOW()),
  ('N/A', 3, NOW(), NOW()),
  ('N/A', 4, NOW(), NOW()),
  ('N/A', 5, NOW(), NOW()),
  ('N/A', 6, NOW(), NOW()),
  ('N/A', 7, NOW(), NOW());

-- 10. Inserción de Management Tools
-- Obtén los IDs de los specific objectives:
-- SELECT id FROM specific_objective;
-- Supón que los IDs son 1, 2, 3, 4, 5, 6, 7:
INSERT INTO management_tool (description, specific_objective_id, created_at, updated_at) VALUES
  ('LIDERAZGO', 1, NOW(), NOW()),
  ('COMITÉ DE SEGURIDAD', 1, NOW(), NOW()),
  ('INSPECCIONES (ÁREAS DE TRABAJO)', 2, NOW(), NOW()),
  ('INSPECCIONES (VEHÍCULOS Y EQUIPOS)', 2, NOW(), NOW()),
  ('INSPECCIONES DE SISTEMA ELÉCTRICO Y EQUIPOS', 2, NOW(), NOW()),
  ('INSPECCIONES (HERRAMIENTAS / EPPs)', 2, NOW(), NOW()),
  ('INSPECCIONES (ELEMENTOS DE EMERGENCIA)', 2, NOW(), NOW()),
  ('MONITOREOS', 2, NOW(), NOW()),
  ('CAPACITACIÓN', 3, NOW(), NOW()),
  ('INVESTIGACIÓN DE ACCIDENTES, INCIDENTES', 4, NOW(), NOW()),
  ('REQUISITOS LEGALES', 5, NOW(), NOW()),
  ('AUDITORÍAS DEL SGSST', 5, NOW(), NOW()),
  ('GESTIÓN DE CONTRATISTAS', 5, NOW(), NOW()),
  ('PLAN DE EMERGENCIA', 6, NOW(), NOW()),
  ('IPERC Y GESTIÓN DE RIESGOS', 7, NOW(), NOW()),
  ('PROCEDIMIENTOS DE TRABAJO', 7, NOW(), NOW());

-- 11. Inserción de Activities
-- Obtén los IDs de los management tools:
-- SELECT id FROM management_tool;
-- Luego inserta las actividades usando los IDs correspondientes.
-- Ejemplo (ajusta los IDs según corresponda):
INSERT INTO activity (description, management_tool_id, created_at, updated_at) VALUES
  ('Revisar las políticas en materia de Seguridad', 1, NOW(), NOW()),
  ('Difundir la polìtica de Alcohol y drogas', 1, NOW(), NOW()),
  ('Difundir la polìtica de Tolerancia cero', 1, NOW(), NOW()),
  ('Publicar las Políticas en los frentes de trabajo', 1, NOW(), NOW()),
  ('Implementar y Desarrollar el Programa Mensual de Liderazgo visible / Desempeño de la Línea de mando en Seguridad', 1, NOW(), NOW()),
  ('Conformación del Comité SST', 2, NOW(), NOW()),
  ('Realizar las elecciones del Comité SST', 2, NOW(), NOW()),
  ('Realizar las Reuniones ordinarias del Comité SST', 2, NOW(), NOW()),
  ('Realizar Inspección mensual por el Comité de Seguridad', 2, NOW(), NOW()),
  ('Capacitar a los miembros del Comité de Seguridad', 2, NOW(), NOW()),
  ('Realizar los Reportes trimestrales del Comité de Seguridad y Salud ocupacional', 2, NOW(), NOW()),
  ('Realizar el Informe Anual de las Actividades del Comité SST', 2, NOW(), NOW()),
  ('Caminata Gerencial', 3, NOW(), NOW()),
  ('Inspecciones de frentes de trabajo (Superficie y subterráneeo)', 3, NOW(), NOW()),
  ('Inspección de talleres (mantenimiento, soldadura, etc)', 3, NOW(), NOW()),
  ('Inspección de campamentos', 3, NOW(), NOW()),
  ('Inspección de polvorín de explosivos', 3, NOW(), NOW()),
  ('Inspección de almacenes', 3, NOW(), NOW()),
  ('Inspección de oficinas', 3, NOW(), NOW()),
  ('Inspección General de Vehiculos y equipos', 4, NOW(), NOW()),
  ('Inspección de grúas', 4, NOW(), NOW()),
  ('Inspección de cisterna de combustible', 4, NOW(), NOW()),
  ('Grupo eléctrogeno / Generador eléctrico', 5, NOW(), NOW()),
  ('Luminarias / Torres de iluminaMonitoreo de Control de Gasesción', 5, NOW(), NOW()),
  ('Inspección de tableros Eléctricos e Instalaciones eléctricas.', 5, NOW(), NOW()),
  ('Inspección de Herramientas  Manuales y eléctricas', 6, NOW(), NOW()),
  ('Inspección de Escaleras Pórtatiles', 6, NOW(), NOW()),
  ('Inspección de Bombas sumergibles', 6, NOW(), NOW()),
  ('Inspección de andamios', 6, NOW(), NOW()),
  ('Inspección de EPPs', 6, NOW(), NOW()),
  ('Inspección de arnés y línea de vida', 6, NOW(), NOW()),
  ('Inspección de Sistema de Izaje - Dispositivos de Izaje - Cables de Izaje', 6, NOW(), NOW()),
  ('Inspección de Extintores', 7, NOW(), NOW()),
  ('Inspección de Sistemas de Protección contra incendios', 7, NOW(), NOW()),
  ('Monitoreo de velocidad de vehiculos', 8, NOW(), NOW()),
  ('Monitoreo de Control de Iluminación', 8, NOW(), NOW()),
  ('Monitoreo de Control de Gases', 8, NOW(), NOW()),
  ('Monitoreo de Control de Gases de vehículos y equipos que ingresan a labores subterráneas', 8, NOW(), NOW()),
  ('Monitoreo de velocidad de viento en labores subterráneas', 8, NOW(), NOW()),
  ('Elaborar y aprobar el programa de Capacitación por puesto de trabajo', 9, NOW(), NOW()),
  ('Cumplir con el programa de Capacitación por puesto de trabajo', 9, NOW(), NOW()),
  ('Desarrollar las charlas integrales', 9, NOW(), NOW()),
  ('Realizar campañas de sensibilización y concientización', 9, NOW(), NOW()),
  ('Cumplir con el levantamiento de acciones correctivas de los incidentes', 10, NOW(), NOW()),
  ('Cumplir con el levantamiento de acciones correctivas de los accidentes', 10, NOW(), NOW()),
  ('Difundir las Lecciones aprendidas de los incidentes', 10, NOW(), NOW()),
  ('Realizar la identificación de los Requisitos legales en materia de Seguridad', 11, NOW(), NOW()),
  ('Realizar la evaluación de cumplimiento de requisitos legales en materia de seguridad', 11, NOW(), NOW()),
  ('Realizar auditoría interna del Sistema de Gestión de Seguridad', 12, NOW(), NOW()),
  ('Realizar auditorías al Sistema de Gestión de Seguridad y Salud ocupacional (De acuerdo al D.S. N°014-2013-TR)', 12, NOW(), NOW()),
  ('Realizar auditorías a nuestras contratistas permanentes de acuerdo al Programa de auditorías', 13, NOW(), NOW()),
  ('Realizar inspecciones a las contratistas', 13, NOW(), NOW()),
  ('Actualizar el Plan de Respuesta a emergencias del proyecto', 14, NOW(), NOW()),
  ('Conformar e identificar las Brigadas de primera Respuesta del proyecto', 14, NOW(), NOW()),
  ('Ejecutar el programa Anual de simulacros (Revisar Plan de Contingencia y Respuesta a emergencia)', 14, NOW(), NOW()),
  ('Cumplir con el programa de Capacitación a la Brigada de emergencia', 14, NOW(), NOW()),
  ('Actualizar los Mapas de Proceso', 15, NOW(), NOW()),
  ('Revisión de la Matriz de Identificación de Peligros, Evaluación de Riesgos y Medidas de Control (IPERC Base)', 15, NOW(), NOW()),
  ('Difundir las Matrices IPERC que se implementan o actualizan', 15, NOW(), NOW()),
  ('Revisión de los Mapas de Riesgos de los frentes de trabajo', 15, NOW(), NOW()),
  ('Verificar los controles de los riesgos críticos en los frentes de trabajo', 15, NOW(), NOW()),
  ('Actualizar los Estándares de Seguridad', 16, NOW(), NOW()),
  ('Actualizar los PETS que tengan más de un año de vigencia', 16, NOW(), NOW()),
  ('Revisar los PETS mediante Observaciones Planeadas de Tarea (OPT)', 16, NOW(), NOW()),
  ('Implementar los PETS para todas las tareas de alto riesgo', 16, NOW(), NOW()),
  ('Difundir los PETS de las actividades', 16, NOW(), NOW());

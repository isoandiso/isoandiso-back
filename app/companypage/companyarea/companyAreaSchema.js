const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const EmployeeCompanyRegistry = require('../../employeecompanyregistry/employeeCompanyRegistrySchema');

const CompanyArea = sequelize.define('companyArea', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  charges: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('charges debe ser un array');
        }
      }
    }
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'company',
      key: 'id',
    },
    field: 'company_id',
  }
}, {
  tableName: 'company_area',
  timestamps: true,
  hooks: {
    /*
      Al eliminar una o varias áreas (serán de la misma compañia) eliminamos el "companyId"
      de los empleados del registro de empleados cuyos mails coincidan con los empleados del área
    */
    beforeDestroy: async (area) => {
      try {
        if (area.companyId) {
          // Obtener todos los empleados del área
          const employees = await area.getEmployees();
          if (employees && employees.length > 0) {
            const employeeEmails = employees.map(emp => emp.email);
            
            // Remover el companyId del registro de empleados
            await Promise.all(
              employeeEmails.map(async (email) => {
                const registry = await EmployeeCompanyRegistry.findOne({
                  where: { employeeEmail: email }
                });
                
                if (registry && registry.companyIds) {
                  const updatedCompanyIds = registry.companyIds.filter(id => id !== area.companyId);
                  await registry.update({ companyIds: updatedCompanyIds });
                }
              })
            );
          }
        }
      } catch (error) {
        console.error('Error en beforeDestroy hook:', error);
        throw error;
      }
    }
  }
});

module.exports = CompanyArea;
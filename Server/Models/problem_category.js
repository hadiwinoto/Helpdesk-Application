module.exports = (Sequelize,connectMysql) => {
    const problemCategory = connectMysql.define("problem_category",{
   
      problem_category : {
        type: Sequelize.STRING
      },
    });
  
    return problemCategory;
  }
  
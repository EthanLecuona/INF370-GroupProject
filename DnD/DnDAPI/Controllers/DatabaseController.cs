using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Threading.Tasks;

namespace DnDApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DatabaseController : ControllerBase
  {
    private IConfiguration _configuration;
    public DatabaseController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [HttpGet]
    [Route("DatabaseBackup")]
    public async Task<IActionResult> DatabaseBackup()
    {
      SqlConnection DBconn = new SqlConnection();
      SqlCommand sqlcmd = new SqlCommand();

      DBconn.ConnectionString = @"Server=tcp:dnd-server1.database.windows.net,1433;Initial Catalog=DnD-database;Persist Security Info=False;User ID=dndAdmin;Password=dnd123!@#;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
      //DBconn.ConnectionString = @"Server=DESKTOP-H1IJK9G;database=DnD;Integrated Security=true;";
      string backupDIR = "E:\\BackupDB";
      if (!System.IO.Directory.Exists(backupDIR))
      {
        System.IO.Directory.CreateDirectory(backupDIR);
      }
      try
      {
        DBconn.Open();
        //sqlcmd = new SqlCommand("backup database DnD to disk='" + backupDIR + "\\" + DateTime.Now.ToString("DnD_Backup_On_dd-MM-yyyy_HH_mm_ss") + ".Bak'", DBconn);
        sqlcmd = new SqlCommand("CREATE DATABASE'" + DateTime.Now.ToString("DnD_Backup_On_dd-MM-yyyy_HH_mm_ss") + "' AS COPY OF [dnd-server1].[DnD-database]", DBconn);
        sqlcmd.ExecuteNonQuery();
        DBconn.Close();
        return Ok();
      }
      catch
      {
        return BadRequest();
      }
    }

    [HttpPost]
    [Route("DatabaseRestore")]
    public async Task<IActionResult> DatabaseRestore(string databaseBak)
    {
      SqlConnection DBconn = new SqlConnection();
      SqlCommand sqlcmd = new SqlCommand();

      DBconn.ConnectionString = @"Server=DESKTOP-H1IJK9G;database=master;Integrated Security=true;";
      string backupDIR = "E:\\BackupDB\\" + databaseBak;
      if (!System.IO.File.Exists(backupDIR))
      {
        return StatusCode(404);
      }
      try
      {
        DBconn.Open();
      sqlcmd = new SqlCommand("ALTER DATABASE DnD SET offline WITH ROLLBACK IMMEDIATE", DBconn);
      sqlcmd.ExecuteNonQuery();
      sqlcmd = new SqlCommand("RESTORE DATABASE DnD FROM DISK = '" + backupDIR + "'WITH REPLACE", DBconn);
      sqlcmd.ExecuteNonQuery();
      sqlcmd = new SqlCommand("ALTER DATABASE DnD SET online", DBconn);
      sqlcmd.ExecuteNonQuery();
      DBconn.Close();
      return Ok();
      }
      catch
      {
        return BadRequest();
      }
    }
  }
}

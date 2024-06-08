using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDApi.Migrations
{
  public partial class Update2 : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AlterColumn<string>(
        name: "DriverUser_ID",
        table: "Incident",
        type: "varchar(900)",
        unicode: false,
        nullable: false,
        defaultValue: "",
        oldClrType: typeof(string),
        oldType: "varchar(max)",
        oldUnicode: false,
        oldNullable: true);

      migrationBuilder.AddForeignKey(
        name: "FK_Incident_Driver_Information_DriverUser_ID",
        table: "Incident",
        column: "DriverUser_ID",
        principalTable: "Driver_Information",
        principalColumn: "DriverUser_ID");

      migrationBuilder.AlterColumn<string>(
        name: "DriverUser_ID",
        table: "Fuel_Price",
        type: "varchar(900)",
        unicode: false,
        nullable: false,
        defaultValue: "",
        oldClrType: typeof(string),
        oldType: "varchar(max)",
        oldUnicode: false,
        oldNullable: true);

      migrationBuilder.AddForeignKey(
        name: "FK_Fuel_Price_Driver_Information_DriverUser_ID",
        table: "Fuel_Price",
        column: "DriverUser_ID",
        principalTable: "Driver_Information",
        principalColumn: "DriverUser_ID");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropIndex(
        name: "IX_Incident_DriverUser_ID",
        table: "Incident");

      migrationBuilder.DropColumn(
        name: "DriverUser_ID",
        table: "Incident");

      migrationBuilder.DropIndex(
        name: "IX_Fuel_Price_DriverUser_ID",
        table: "Incident");

      migrationBuilder.DropColumn(
        name: "DriverUser_ID",
        table: "Fuel_Price");
    }
  }
}

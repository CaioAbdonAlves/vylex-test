import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDTO {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsImlhdCI6MTYyNjU3MjM2MiwiZXhwIjoxNjI2NTc0OTYyfQ.NyvZI-Hst7TJuhHNTddzAYHcODlzW4NRh5B9zFq9Aic',
  })
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @ApiProperty({ example: 'newPassword123' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { EmployeeService } from './user.service';

@WebSocketGateway({ cors: true })
export class ConnectionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly employeeService: EmployeeService) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const employeeId = Array.isArray(client.handshake.query.employeeId)
      ? client.handshake.query.employeeId.find((id) => id.trim() !== '')
      : client.handshake.query.employeeId ?? '';

    console.log(employeeId);

    try {
      if (employeeId)
        await this.employeeService
          .updateEmployeeStatus(employeeId, 'Active')
          .then(() => {
            console.log('updated');
            this.server.emit('employeeonline', { employeeId });
          });
    } catch (error) {
      Logger.error(`Failed to update employee status: ${error.message}`);
    }
  }

  async handleDisconnect(client: Socket) {
    const employeeId = Array.isArray(client.handshake.query.employeeId)
      ? client.handshake.query.employeeId.find((id) => id.trim() !== '')
      : client.handshake.query.employeeId ?? '';

    Logger.log('disconnected');

    try {
      if (employeeId)
        await this.employeeService
          .updateEmployeeStatus(employeeId, 'Out')
          .then(() => {
            console.log('updated');
            this.server.emit('employeeoffline', { employeeId });
          });
    } catch (error) {
      Logger.error(`Failed to update employee status: ${error.message}`);
    }
  }
}

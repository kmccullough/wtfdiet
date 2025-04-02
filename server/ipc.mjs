import ipc from 'node-ipc';

import { config } from '@server/config.mjs';

const ipcId = config.settings['ipc-id'];
ipc.config.id = ipcId;
ipc.config.stopRetrying = 0;
ipc.config.silent = true;

const maintenanceNoticeDelay = config.settings['maintenance-notice-delay'];

let updateDelayed = 0;
ipc.serve(() => {

  ipc.server.on('tty', (data, socket) => {
    console.log('tty requested');
    ipc.server.emit(socket, 'tty');
  });

  ipc.server.on('update', (data, socket) => {
    if (updateDelayed === 0) {
      console.log('Server update requested. Sending maintenance notices.');
      console.log(`Update will commence in ${maintenanceNoticeDelay * 2} ms...`);
      // Notify tic-tac-toe clients that the server will soon be going down for maintenance
      // io.emit('maintenance', maintenanceNoticeDelay * 2);
      // Respond to update server that we need some time...
      ipc.server.emit(socket, 'update', maintenanceNoticeDelay);
    } else if (updateDelayed === 1) {
      console.log(`Update will commence in ${maintenanceNoticeDelay} ms...`);
      // Notify tic-tac-toe clients that the server will SOON be going down for maintenance
      // io.emit('maintenance', maintenanceNoticeDelay);
      // Respond to update server that we need MORE time...
      ipc.server.emit(socket, 'update', maintenanceNoticeDelay);
    } else {
      console.log(`Ready for update.`);
      // Respond to update server that we are ready for update
      ipc.server.emit(socket, 'update');
    }
    updateDelayed = (updateDelayed + 1) % 3;
  });

  ipc.server.on('disconnect', () => {
    updateDelayed = 0;
  });

});

ipc.server.start();

import { CrochetClientImplementation } from 'client';
import { CrochetServerImplementation } from 'server';

export { Controller } from 'client';
export { Service } from 'server';
export { OnInit, OnStart, OnHeartbeat, EventDefinition, FunctionDefinition } from 'core';

const RunService = game.GetService('RunService');

function getErroringObject(errorMessage: string): unknown {
    return setmetatable(
        {},
        {
            __index() {
                error(errorMessage);
            }
        }
    );
}

/**
 * This is the instance to import to use Crochet on the service.
 *
 * @throws CrochetServer can only be imported on the server and will error if used by a client.
 */
export const CrochetServer: CrochetServerImplementation = RunService.IsServer()
    ? new CrochetServerImplementation()
    : (getErroringObject('CrochetServer can only be used on the Server!') as CrochetServerImplementation);

/**
 * This is the instance to import to use Crochet on a client.
 *
 * @throws CrochetClient can only be imported on a client and will error if used by the server.
 */
export const CrochetClient: CrochetClientImplementation = RunService.IsClient()
    ? new CrochetClientImplementation()
    : (getErroringObject('CrochetClient can only be used on the Client!') as CrochetClientImplementation);

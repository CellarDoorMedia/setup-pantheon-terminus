/**
 * Pantheon Terminus Setup
 *
 * @package setupPantheonTerminus
 */

// External Dependencies
const core = require( '@actions/core' );
const exec = require( '@actions/exec' );

async function run() {
	try {
		const PANTHEON_MACHINE_TOKEN = core.getInput( 'pantheon-machine-token' );

		await exec.exec( 'mkdir /tmp/terminus' );
		await exec.exec( 'curl -o /tmp/terminus/installer.phar https://raw.githubusercontent.com/pantheon-systems/terminus-installer/master/builds/installer.phar' );
		await exec.exec( 'sudo php /tmp/terminus/installer.phar install --install-dir=/bin' ); // Sudo is required in order to install bin/terminus.
		await exec.exec( 'terminus', [ 'auth:login', `--machine-token=${ PANTHEON_MACHINE_TOKEN }` ] );
	} catch ( error ) {
		core.setFailed( error.message );
	}
}

run()

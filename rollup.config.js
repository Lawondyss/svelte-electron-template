import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'


const production = !process.env.ROLLUP_WATCH

function serve() {
	let server

	function exit() {
		if (server) server.kill(0)
	}

	function restart() {
		exit()
		start()
	}

	function start() {
		server = require('child_process').spawn('npm', ['run', 'start'], {
			stdio: ['ignore', 'inherit', 'inherit'],
			shell: true
		})
		
		server.on('exit', restart)
	}
 
	return {
		writeBundle() {
			if (server) return
			
			start()

			process.on('SIGTERM', exit)
			process.on('exit', exit)
		}
	}
}

export default {
	input: 'frontend/app.js',
	output: {
		sourcemap: production,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
	},

	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		json(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],

	watch: {
		clearScreen: false,
	}
}

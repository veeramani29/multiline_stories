# multiline_stories
Task of multi line stories
let cluster = require("cluster");
let numCPUs = require("os").cpus().length;
let _ = require("underscore");
const dotenv = require("dotenv");

loadEnvConfig();
const index = require("./index");

if (!process.env.PORT) throw new Error("process.env.PORT not set");

let CLUSTER_ENV_VARS = {};
(
	async function run() {
		if (cluster.isMaster) fork();
		else {
			const config = await index.configure();
			console.log(config);
			await index.initialize();
		}

	}
)();

/**
 * fork one process per cpu
 */
function fork() {
	console.log(`Number Of CPUS ${numCPUs}`);
	for (let i = 0; i < numCPUs; i++) {
		let envClone = _.clone(process.env);
		envClone.PORT = parseInt(process.env.PORT) + i;

		let worker = cluster.fork(envClone);
		CLUSTER_ENV_VARS[worker.id] = envClone;
	}

	cluster.on("exit", function (worker) {
		console.log("worker %s died, forking again", worker.process.pid);
		let new_worker = cluster.fork(CLUSTER_ENV_VARS[worker.id]);
		CLUSTER_ENV_VARS[new_worker.id] = CLUSTER_ENV_VARS[worker.id];
	});

}

/**
 * Load local config from .env file if instance running in local
 * @returns {{isLocal: Boolean}}
 */
function loadEnvConfig() {
	const isLocal = process.env.IS_LOCAL === "true";
	if (isLocal) {
		dotenv.config();
		numCPUs = 1;
	}
	return {
		isLocal,
	};
}

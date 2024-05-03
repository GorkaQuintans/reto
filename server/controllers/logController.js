const Log = require('../models/Log')

exports.log_lista = async (req, res) => {
     //res.send('estos son los logs')
     try {
        const logsResultado = await Log.find()
        //res.status(200).json(logsResultado)
        res.render('logs', {logs: logsResultado})
        console.log(logsResultado)
    } catch (error) {
        res.status(404).json({mensaje: error})
    }
}

exports.log_detalle = async (req, res) => {
    try {
        const log = await Log.find({_id: req.params.id})
        res.status(200).json(log)
    } catch (error) {
        res.status(404).json({mensaje: error})
    }
}

exports.log_crear = async (req, res) => {
    const log = new Log({
        host: req.body.host,
        usuario: req.body.usuario,
        fecha: req.body.fecha,
        recurso: req.body.recurso,
        codigo: req.body.codigo,
        tamano: req.body.tamano,
        pagina: req.body.pagina,
        navegador: req.body.navegador
    })
    try {
        const newLog = await log.save()
        res.status(201).json(newLog)
    } catch (error) {
        res.status(400).json({mensaje: error})
    }
}

exports.log_actualizar = async (req, res) => {
    let log = await Log.findOne({_id: req.params.id})
    //Un if para cada campo que pueda cambiar - Hay más maneras
    if (log.usuario != req.body.usuario) {
        log.usuario = req.body.usuario
    }
    try {
        let newLog = await log.save()
        res.status(200).json(newLog)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.log_eliminar = async (req, res) => {
    try {
        await Log.deleteOne({_id: req.params.id})
        res.status(200).json('Log eliminado con éxito')
    } catch (error) {
        res.status(400).json(error)
    }
}
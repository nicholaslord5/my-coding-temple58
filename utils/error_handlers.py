from flask import jsonify

def handle_exception(e):
    return jsonify({'error': str(e)}), 500

def resource_not_found():
    return jsonify({'error': 'Resource not found'}), 404

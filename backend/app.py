from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

#init app
app = Flask(__name__)
CORS(app)
base_dir = os.path.abspath(os.path.dirname(__file__))

#database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# init db
db = SQLAlchemy(app)

#init marshmallow
marshmallow = Marshmallow(app)

# customer model
class Customer(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(100))
   instagram = db.Column(db.String(20), unique=True)
   fav_color = db.Column(db.String(20))

   def __init__(self, name, instagram, fav_color):
      self.name = name
      self.instagram = instagram
      self.fav_color = fav_color

#customer schema
class CustomerSchema(marshmallow.Schema):
   class Meta:
      fields = ('id', 'name', 'instagram', 'fav_color')

#init schema
customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)

# Get all customer 
@app.route('/api/customers', methods=['GET'])
def get_customer():
    try:
        all_customers = Customer.query.all()

        result = customers_schema.dump(all_customers)

        response_data = {
            'status': 200,
            'message': 'Success',
            'data': result
        }

        return jsonify(response_data), 200
    
    except Exception as e:
        error_message = str(e)
        response_data = {
            'status': 500,
            'message': 'Error',
            'error': error_message
        }

        return jsonify(response_data), 500

# Get customer by ID
@app.route('/api/customer/<int:customer_id>', methods=['GET'])
def get_customer_by_id(customer_id):
    try:
        customer = Customer.query.get(customer_id)

        if not customer:
            abort(404, description=f"Customer with ID {customer_id} not found")

        # Serialize the customer data
        customer_data = customer_schema.dump(customer)

        response_data = {
            'status': 200,
            'message': 'Success',
            'data': customer_data
        }

        return jsonify(response_data), 200
    
    except Exception as e:
        error_message = str(e)
        response_data = {
            'status': 500,
            'message': 'Error',
            'error': error_message
        }

        return jsonify(response_data), 500

# create customer
@app.route('/api/customer/create', methods=['POST'])
def add_customer():
   try:
      name = request.json['name']
      instagram = request.json['instagram']
      fav_color = request.json['fav_color']

      new_customer = Customer(name, instagram, fav_color)

      db.session.add(new_customer)
      db.session.commit()

      serialized_customer = customer_schema.dump(new_customer)

      response_data = {
         'status': 201,
         'message': 'Success',
         'data': serialized_customer
      }

      return jsonify(response_data), 201
    
   except Exception as e:
      error_message = str(e)
      response_data = {
         'status': 500,
         'message': 'Error',
         'error': error_message
      }

      return jsonify(response_data), 500

# Update customer by ID
@app.route('/api/customer/update/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    try:
        customer_to_update = Customer.query.get(customer_id)

        if not customer_to_update:
            abort(404, description=f"Customer with ID {customer_id} not found")

        updated_data = request.json

        customer_to_update.name = updated_data.get('name', customer_to_update.name)
        customer_to_update.instagram = updated_data.get('instagram', customer_to_update.instagram)
        customer_to_update.fav_color = updated_data.get('fav_color', customer_to_update.fav_color)

        db.session.commit()

        response_data = {
            'status': 200,
            'message': 'Success',
            'data': customer_schema.dump(customer_to_update)
        }

        return jsonify(response_data), 200
    
    except Exception as e:
        error_message = str(e)
        response_data = {
            'status': 500,
            'message': 'Error',
            'error': error_message
        }

        return jsonify(response_data), 500

# Delete customer by ID
@app.route('/api/customer/delete/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
   try:
      customer_to_delete = Customer.query.get(customer_id)

      if not customer_to_delete:
         abort(404, description=f"Customer with ID {customer_id} not found")

      db.session.delete(customer_to_delete)
      db.session.commit()

      response_data = {
         'status': 200,
         'message': 'Success',
         'data': f"Customer with ID {customer_id} deleted successfully"
      }

      return jsonify(response_data), 200
   
   except Exception as e:
      error_message = str(e)
      response_data = {
         'status': 500,
         'message': 'Error',
         'error': error_message
      }

      return jsonify(response_data), 500

with app.app_context():
    db.create_all()


#run server
if __name__ == '__main__':
   app.run(debug=True)
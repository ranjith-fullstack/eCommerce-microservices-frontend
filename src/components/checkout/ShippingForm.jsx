import InputField from './InputField';

export default function ShippingForm({ formData, onChange, errors = {} }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Shipping Information</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            error={errors.firstName}
            placeholder="xxxxxxxxxxx"
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            error={errors.lastName}
            placeholder="xxxx"
          />
        </div>
        
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          placeholder="xxxxxxxxxx.xxxx@example.com"
        />
        
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          error={errors.phone}
          placeholder="+91 xxxxx xxxxx"
        />
        
        <InputField
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={onChange}
          error={errors.address}
          placeholder="1234 Mxxxn Stxxx"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={onChange}
            error={errors.city}
            placeholder="San Frxxxxxsco"
          />
          
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={onChange}
            error={errors.state}
            placeholder="Calxxxxxxrnia"
          />
          
          <InputField
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            error={errors.zipCode}
            placeholder="91xx63"
          />
        </div>
      </div>
    </div>
  );
}
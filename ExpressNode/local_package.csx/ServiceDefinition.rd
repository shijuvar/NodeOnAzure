<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="ExpressNode" generation="1" functional="0" release="0" Id="322e42b6-e522-48fd-9346-8afe58cbfe8b" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="ExpressNodeGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="ExpressWebApp:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/ExpressNode/ExpressNodeGroup/LB:ExpressWebApp:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="ExpressWebAppInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/ExpressNode/ExpressNodeGroup/MapExpressWebAppInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:ExpressWebApp:Endpoint1">
          <toPorts>
            <inPortMoniker name="/ExpressNode/ExpressNodeGroup/ExpressWebApp/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapExpressWebAppInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/ExpressNode/ExpressNodeGroup/ExpressWebAppInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="ExpressWebApp" generation="1" functional="0" release="0" software="D:\nodejs\ExpressNode\local_package.csx\roles\ExpressWebApp" entryPoint="base\x86\WaHostBootstrapper.exe" parameters="base\x86\WaIISHost.exe " memIndex="768" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;ExpressWebApp&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;ExpressWebApp&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/ExpressNode/ExpressNodeGroup/ExpressWebAppInstances" />
            <sCSPolicyFaultDomainMoniker name="/ExpressNode/ExpressNodeGroup/ExpressWebAppFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyFaultDomain name="ExpressWebAppFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="ExpressWebAppInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="71bc7f7e-740c-4e52-a643-8d499b0c4f84" ref="Microsoft.RedDog.Contract\ServiceContract\ExpressNodeContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="fe6958e9-7434-4de9-8869-c348f577b0ad" ref="Microsoft.RedDog.Contract\Interface\ExpressWebApp:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/ExpressNode/ExpressNodeGroup/ExpressWebApp:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>